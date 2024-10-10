import React from 'react';
import bowser from 'bowser';

const BrowserInstructions = () => {
    // Detect browser
    const browser = bowser.getParser(window.navigator.userAgent);
    const browserName = browser.getBrowserName();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instructions: any = {
        "Google Chrome": (
            <div className="space-y-2">
                <h4 className="font-bold text-lg">Google Chrome</h4>
                <p>Click the lock icon next to the URL at the top.</p>
                <p>Find 'Camera' and 'Microphone' settings.</p>
                <p>Change to 'Allow'.</p>
                <p>Reload the page.</p>
            </div>
        ),
        "Mozilla Firefox": (
            <div className="space-y-2">
                <h4 className="font-bold text-lg">Mozilla Firefox</h4>
                <p>Click the lock icon next to the URL at the top.</p>
                <p>Click 'More Information', then 'Permissions'.</p>
                <p>Change the settings for Camera and Microphone to 'Allow'.</p>
                <p>Reload the page.</p>
            </div>
        ),
        "Safari": (
            <div className="space-y-2">
                <h4 className="font-bold text-lg">Safari</h4>
                <p>Go to 'Safari' {'>'} 'Settings for This Website'.</p>
                <p>Allow access to your camera and microphone.</p>
                <p>Reload the page.</p>
            </div>
        ),
        "Microsoft Edge": (
            <div className="space-y-2">
                <h4 className="font-bold text-lg">Microsoft Edge</h4>
                <p>Click the lock icon next to the URL at the top.</p>
                <p>Manage permissions for the website in the new window that opens.</p>
                <p>Change the camera and microphone settings to 'Allow'.</p>
                <p>Reload the page.</p>
            </div>
        ),
        "default": (
            <div className="space-y-2 w-5/6">
                <h4 className="w-full text-lg  sm:text-xl font-bold sm:leading-6 text-slate-800">Browser Instructions</h4>
                <div className='space-y-2 w-full text-md sm:text-lg leading-5 text-neutral-500 font-spline '>
                <p>Check the settings in your browser to allow camera and microphone access.</p>
                <p className='max-sm:hidden'>Usually, this is done by clicking a camera or microphone icon in the address bar, or by going into the browser's privacy settings.</p>
                </div>

            </div>
        )
    };

    // Determine which instructions to show based on the detected browser
    const browserInstructions = instructions[browserName] || instructions['default'];

    return (
        <div className="">
            {browserInstructions}
        </div>
    );
};

export default BrowserInstructions;
