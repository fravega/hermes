var generador = {
	init: function() {
		this.tabuladores();
	},
	tabuladores: function() {
		$("#preview").on("click", function() {
			$("#tabela").html("");
			var _tabuladores = $("#tabuladores").val();
			_tabuladores = _tabuladores.replace(/\r\n|\r|\n/g, ",").split(",");
			var code = [];
			var i = 0;
			var j = 0;
			var tipo = "odd";
			$.each(_tabuladores, function(index, val) {
				var value = val.toUpperCase().replace(/ /g, '_').replace("Ñ", "N").replace("Á", "AA").replace("É", "AE").replace("Í", "AI").replace("Ó", "AO").replace("Ú", "AU").replace("(","").replace(")","");
				i++, j++;
				if (i == 1) {
					var _val_lower = val.toLowerCase().replace(" ", "_");
					var _tr = $("<tr />").addClass("tr_" + j);

					_tr.addClass(_val_lower);
					if (tipo == "odd") {
						_tr.css({
							"background-color": "rgb(237, 230, 230)"
						});
						tipo = "even";
					} else if (tipo == "even") {
						_tr.css({
							"background-color": "rgb(255, 255, 255)"
						});
						tipo = "odd";
					}
				} else if (i == 2) {
					var _tr = $(".tr_" + (j - 1));

					i = 0;
				}

				var _th = $("<th />").css({
					"text-align": "left",
					"padding": "5px 0 5px 10px",
					"width": "25%"
				});
				var _td = $("<td />").css({
					"text-align": "left",
					"padding": "5px 0 5px 10px",
					"width": "25%"
				});

				_th.html("<strong>" + val + ":</strong> ");
				_td.html("##" + value + "##");

				_th.appendTo(_tr);
				_td.appendTo(_tr);

				_tr.css({
					"font-family": "Arial,Helvetica,'Nimbus Sans L',sans-serif",
					"font-size": "12px",
					"display": "table",
					"width": "100%",
					"margin": "0 0 5px"
				}).appendTo("#tabela");
			});
		});
		$("#code").on("click", function(){
			$("#preview").trigger('click');
			$("#codes").val($(".preview div").html());
		});
		$("#clean").on("click", function(){
			$("#tabuladores").val("");
			$("#codes").val("");
		});
	}
}

$(function() {
	generador.init();
});
