const hostname = window.location.hostname;

const base = {
  localhost: "/",
  platform: "/",
};

let basename = "";
if (hostname ==="localhost"||hostname === "192.168.0.170:5000") {
  basename = base.platform;
} else {
  basename = base.platform;
}
export default basename;