// Google Analytics service with cookie consent integration
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

class AnalyticsService {
  private isInitialized = false;
  private isEnabled = false;

  constructor() {
    this.checkConsent();
  }

  // Check if analytics is enabled based on cookie consent
  private checkConsent() {
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      const preferences = JSON.parse(consent);
      this.isEnabled = preferences.analytics || false;
    }
  }

  // Initialize Google Analytics
  public initialize() {
    if (this.isInitialized || !this.isEnabled) return;

    try {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-C3LDCQL11X';
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', 'G-C3LDCQL11X', {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure',
        send_page_view: false // We'll send page views manually
      });

      this.isInitialized = true;
      console.log('Google Analytics initialized');
    } catch (error) {
      console.error('Failed to initialize Google Analytics:', error);
    }
  }

  // Track page view
  public trackPageView(path: string, title?: string) {
    if (!this.isEnabled || !this.isInitialized) return;

    try {
      window.gtag('config', 'G-C3LDCQL11X', {
        page_path: path,
        page_title: title || document.title
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  // Track custom event
  public trackEvent(eventName: string, parameters?: Record<string, any>) {
    if (!this.isEnabled || !this.isInitialized) return;

    try {
      window.gtag('event', eventName, parameters);
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  // Track music play
  public trackMusicPlay(trackName: string, artist: string) {
    this.trackEvent('music_play', {
      track_name: trackName,
      artist: artist,
      event_category: 'Music',
      event_label: `${artist} - ${trackName}`
    });
  }

  // Track remix creation
  public trackRemixCreation(trackCount: number, duration: number) {
    this.trackEvent('remix_creation', {
      track_count: trackCount,
      duration: duration,
      event_category: 'Remix Lab',
      event_label: `Created remix with ${trackCount} tracks`
    });
  }

  // Track download
  public trackDownload(fileType: string, fileName: string) {
    this.trackEvent('file_download', {
      file_type: fileType,
      file_name: fileName,
      event_category: 'Download',
      event_label: `${fileType} download`
    });
  }

  // Track button click
  public trackButtonClick(buttonName: string, location: string) {
    this.trackEvent('button_click', {
      button_name: buttonName,
      location: location,
      event_category: 'UI Interaction',
      event_label: `${buttonName} clicked in ${location}`
    });
  }

  // Enable analytics (called when user accepts cookies)
  public enable() {
    this.isEnabled = true;
    this.initialize();
  }

  // Disable analytics (called when user declines cookies)
  public disable() {
    this.isEnabled = false;
    // Note: We don't remove the script, just stop tracking
  }

  // Check if analytics is currently enabled
  public isAnalyticsEnabled(): boolean {
    return this.isEnabled && this.isInitialized;
  }
}

// Export singleton instance
export const analytics = new AnalyticsService();
export default analytics;
