
export function registerElement(name, src) {
    return new Promise((resolve, reject) => {
        // dynamically insert script (if doesn't already exist)
        if (!document.getElementById(name)) {
            const script = document.createElement('script');
            script.src = src;
            script.id = name;
            script.onload = () => {
                resolve();
            }
            script.onerror = e => {
                reject(e);
            }
            document.body.appendChild(script);
        }
    });
}