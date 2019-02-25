var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var PixelArtGUI = function (_React$Component) {_inherits(PixelArtGUI, _React$Component);
   function PixelArtGUI(props) {_classCallCheck(this, PixelArtGUI);var _this = _possibleConstructorReturn(this, (PixelArtGUI.__proto__ || Object.getPrototypeOf(PixelArtGUI)).call(this));

      _this.state = {
         originalImageSrc: "",
         pixelArtSrc: "",
         previewImageSrc: "" };

      _this.placeholderImage = {
         width: 0,
         height: 0,
         src: "" };

      _this.pixelArt = _this.previewImage = _this.placeholderImage;
      //this.pixelArt = new Image();
      //this.pixelArt.onload = () => {this.genPreviewImage()};
      //this.pixelArt.onload.bind(this);
      //this.pixelArt.src = document.querySelector("demoimg");
      _this.colorDepth = "8-bit";
      _this.fileInput = React.createRef();
      _this.uploadHandler = _this.uploadHandler.bind(_this);return _this;
   }_createClass(PixelArtGUI, [{ key: "uploadHandler", value: function uploadHandler()
      {var _this2 = this;
         var file = this.fileInput.current.files[0];
         var reader = new FileReader();

         reader.onloadend = function () {
            _this2.originalImage = new Image();

            _this2.originalImage.onload = function () {
               _this2.genPixelArt();
            };
            _this2.originalImage.onload.bind(_this2);
            _this2.originalImage.src = reader.result;
         };

         if (file) {
            reader.readAsDataURL(file);
         } else
         {
            this.originalImage.src = "";
         }
      } }, { key: "colorDepthHandler", value: function colorDepthHandler(
      event) {
         console.log(event.target.value);
         this.colorDepth = event.target.value;
         this.genPixelArt();
      } }, { key: "genPixelArt", value: function genPixelArt()
      {var _this3 = this;
         var canvas = scaledCanvas(this.originalImage, 64);
         setColorDepth(canvas, this.colorDepth);

         this.pixelArt = new Image();
         this.pixelArt.onload = function () {
            _this3.genPreviewImage();
         };
         this.pixelArt.onload.bind(this);
         this.pixelArt.src = canvas.toDataURL();
      } }, { key: "genPreviewImage", value: function genPreviewImage()
      {var _this4 = this;
         var canvas = scaledCanvas(this.pixelArt, 512);

         this.previewImage = new Image();
         this.previewImage.onload = function () {
            _this4.setState({
               originalImageSrc: _this4.originalImage.src,
               pixelArtSrc: _this4.pixelArt.src,
               previewImageSrc: _this4.previewImage.src });

         };

         this.previewImage.src = canvas.toDataURL();

      } }, { key: "render", value: function render()
      {var _this5 = this;
         return (
            React.createElement("div", { className: "container-fluid text-white" },
               React.createElement("div", { className: "row" },
                  React.createElement("div", { className: "col-sm" },
                     React.createElement(PAPreview, {
                        src: this.state.previewImageSrc,
                        width: this.previewImage.width,
                        height: this.previewImage.height })),


                  React.createElement("div", { className: "col-sm-6 col-md-5 col-xl-3" },
                     React.createElement(PAControlPanel, {
                        handleChange: function handleChange(event) {_this5.colorDepthHandler(event);},
                        pixelArtSrc: this.state.pixelArtSrc,
                        previewImageSrc: this.state.previewImageSrc,
                        uploadHandler: this.uploadHandler,
                        fileInput: this.fileInput })))));





      } }]);return PixelArtGUI;}(React.Component);


function PAPreview(props) {
   return (
      React.createElement("img", {
         className: "PAPreview img-thumbnail",
         src: props.src,
         width: props.width,
         height: props.height }));


}

function PAControlPanel(props) {
   return (
      React.createElement("div", { className: "PAControlPanel card-body" },
         React.createElement("h2", null, "Control Panel"),
         React.createElement(PAImgInput, {
            uploadHandler: props.uploadHandler,
            fileInput: props.fileInput }),

         React.createElement("h4", null, "Color Depth"),
         React.createElement("div", {
               onChange: props.handleChange,
               className: "btn-group btn-group-toggle col-12",
               dataToggle: "buttons" },

            React.createElement(PARadio, {
               id: "8-bit",
               name: "colordepth",
               value: "8-bit" }),

            React.createElement(PARadio, {
               id: "16-bit",
               name: "colordepth",
               value: "16-bit" }),

            React.createElement(PARadio, {
               id: "24-bit",
               name: "colordepth",
               value: "24-bit" })),


         React.createElement("h4", null, "Downloads"),
         React.createElement("div", { className: "btn-group col-12" },
            React.createElement(PADlBtn, {
               fileName: "pixelArt",
               text: "Download pixel art",
               src: props.pixelArtSrc }),

            React.createElement(PADlBtn, {
               fileName: "previewImage",
               text: "Download scaled view",
               src: props.previewImageSrc }))));




}

function PARadio(props) {
   return (
      React.createElement("label", { "class": "btn btn-primary" },
         React.createElement("input", {
            type: "radio",
            name: props.name,
            id: props.id,
            value: props.value }), " ",
         props.value));


}

function PADlBtn(props) {
   return (
      React.createElement("a", { "class": "btn btn-success",
            download: props.fileName,
            href: props.src,
            role: "button" },
         props.text));

}

function PAImgInput(props) {
   return (
      React.createElement("div", { className: "custom-file" },
         React.createElement("input", {
            type: "file",
            style: { display: "none" },
            onChange: props.uploadHandler,
            ref: props.fileInput,
            id: "fileInput",
            className: "custom-file-input" }),

         React.createElement("label", { className: "custom-file-label", "for": "fileInput" }, "Select Image")));


}

function scaledCanvas(image, outputWidth) {var smooth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
   // Converts image to a canvas scaled to outputWidth
   // Returns scaled canvas
   var canvas = document.createElement('canvas');
   var width = outputWidth;
   var height = width * image.height / image.width;
   canvas.width = width;
   canvas.height = height;

   var ctx = canvas.getContext('2d');
   ctx.imageSmoothingEnabled = smooth;
   ctx.drawImage(image, 0, 0, width, height);
   return canvas;
}

function setColorDepth(canvas, depth) {
   if (depth == '24-bit') return;
   var ctx = canvas.getContext('2d');
   var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
   var data = imgData.data;

   var depths = {
      '8-bit': [3, 3, 2],
      '16-bit': [5, 6, 5] };


   var d = depths[depth];
   for (var i = 0; i < data.length; i += 4) {
      data[i] = nearest(data[i], d[0]);
      data[i + 1] = nearest(data[i + 1], d[1]);
      data[i + 2] = nearest(data[i + 2], d[2]);
   }
   ctx.putImageData(imgData, 0, 0);
}
function nearest(x, a) {// will round down to nearest of a possibilities
   // in the range 0 <= x <= 255
   return Math.floor(x / (255 / a)) * (255 / a);
}


ReactDOM.render(
React.createElement(PixelArtGUI, null),
document.querySelector("#root"));