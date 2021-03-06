(function($) {
  "use strict";

  window.Analytics = {
    modal: function(options) {
      var div = document.createElement("div");

      PluginEndpoint.ensure();

      $(div).addClass("analytics-plugin").dialog({
        title: options.title || "Analytics",
        width: 760,
        height: 495,
        close: function(e, ui) {
          $(div).remove();
        }
      });

      $.ajax({
        url: options.url,
        params: {
          pipeline_counter: options.pipeline_counter
        },
        dataType: "json",
        type: "GET"
      }).done(function(r) {
        var frame = document.createElement("iframe");
        frame.sandbox = "allow-scripts";

        frame.onload = function(e) {
          PluginEndpoint.send(frame.contentWindow, options.key, JSON.parse(r.data));
        };

        div.appendChild(frame);
        frame.setAttribute("src", r.view_path);
      });
    }
  };

})(jQuery);
