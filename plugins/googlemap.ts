export default defineNuxtPlugin(() => {
    return {
      provide: {
        loadGoogleMaps: () => {
          return new Promise((resolve, reject) => {
            // Check if Google Maps API is already loaded
            if (typeof window.google !== 'undefined') {
              resolve(window.google);  // TypeScript now knows that `window.google` exists
              return;
            }
  
            // Create a script element to load Google Maps API
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDHq7ERLIFZX2Mi79e0P_SIi5SL4ujwsw8&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => resolve(window.google);  // This will be correctly recognized
            script.onerror = reject;
  
            // Append the script to the document head
            document.head.appendChild(script);
          });
        },
      },
    };
  });
  