const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
// mod 19 act 25/28
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    // store the event object; deferred prompt can be triggered later but can only be used once (i.e. app is installed once)
    window.deferredPrompt = event;
    // make the button visible prior to installation
    butInstall.style.visibility = 'visible';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // retreive the stored deferredPrompt
    const promptEvent = window.deferredPrompt;
    // if deferredPrompt is not available, exit the function and do nothing
    if (!promptEvent) {
        return;
    }
    // trigger the install prompt
    promptEvent.prompt();
    // reset the deferredPrompt to null after installation
    window.deferredPrompt = null;
    // disable the install button after installation
    butInstall.setAttribute('disabled', true);
});

// TODO: Add an handler for the `appinstalled` event
// listen for the appinstalled event
window.addEventListener('appinstalled', (event) => {
  console.log("👍", "appinstalled", event);
  // reset the deferredPrompt to null again just in case
  window.deferredPrompt = null;
});
