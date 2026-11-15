import UIKit
import WebKit

/// The one screen of the app: a loading spinner, then the web interface full screen.
final class HostViewController: UIViewController {
    private let spinner = UIActivityIndicatorView(style: .large)
    private let errorLabel = UILabel()
    private(set) var shown: WKWebView?

    override var preferredStatusBarStyle: UIStatusBarStyle { .lightContent }
    override var prefersHomeIndicatorAutoHidden: Bool { true }
    override var supportedInterfaceOrientations: UIInterfaceOrientationMask { .allButUpsideDown }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .black

        spinner.color = .white
        spinner.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(spinner)

        errorLabel.textColor = UIColor(white: 1, alpha: 0.85)
        errorLabel.font = UIFont.systemFont(ofSize: 13)
        errorLabel.numberOfLines = 0
        errorLabel.textAlignment = .center
        errorLabel.isHidden = true
        errorLabel.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(errorLabel)

        NSLayoutConstraint.activate([
            spinner.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            spinner.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            errorLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 24),
            errorLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -24),
            errorLabel.topAnchor.constraint(equalTo: spinner.bottomAnchor, constant: 24)
        ])
        spinner.startAnimating()

        DispatchQueue.main.async { Runtime.shared.start(host: self) }
    }

    /// Puts a web view behind the spinner so it loads at the real screen size.
    func attach(_ wv: WKWebView) {
        wv.frame = view.bounds
        wv.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        view.insertSubview(wv, at: 0)
    }

    /// Shows the web view (Scriptable's `present`).
    func reveal(_ wv: WKWebView) {
        if wv.superview !== view { attach(wv) }
        shown = wv
        view.bringSubviewToFront(wv)
        spinner.stopAnimating()
        spinner.isHidden = true
        errorLabel.isHidden = true
    }

    func showError(_ text: String) {
        errorLabel.text = text
        errorLabel.isHidden = false
        view.bringSubviewToFront(errorLabel)
    }
}
