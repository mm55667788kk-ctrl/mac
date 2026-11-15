import UIKit
import AVFoundation

// سهرة MAC — the app runs the same script that runs in Scriptable, inside its own small runtime
// (JavaScriptCore + WKWebView), so the interface, the portal client and the players are identical.
@main
final class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
        // sound keeps going with the screen locked or in picture-in-picture
        let session = AVAudioSession.sharedInstance()
        try? session.setCategory(.playback, mode: .moviePlayback, options: [])
        try? session.setActive(true)

        let host = HostViewController()
        let w = UIWindow(frame: UIScreen.main.bounds)
        w.backgroundColor = .black
        w.rootViewController = host
        w.makeKeyAndVisible()
        window = w
        return true
    }
}
