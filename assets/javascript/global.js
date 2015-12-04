$(function() {
	$(".buscar").on("click", function() {
		$("#tabela").html("");
		$("#descripcion").html("");
		$(".resultado").find("h1").hide();
		$(".resultado").find("ul").hide();
		$(".preview").hide();
		$(".code").hide();
		var _url = "//fravega.com/api/catalog_system/pub/products/search/" + $("#id-sku").val();
		$.getJSON(_url, function(data) {
			if (data == "") {
				$(".resultado").find("h1").text("Producto no encontrado o sin stock.");
				$(".resultado").find("h1").show();
				$(".resultado").find("ul").hide();
				$(".preview-btn").show();
				$(".codigo").show();
				return false;
			}
			$(".resultado").find("ul").show();
			var img;
			$.each(data[0].items[0].images, function(i) {
				img = data[0].items[0].images[i].imageUrl;
			});

			var name = data[0].productName;
			var uri = data[0].link;

			$("#resultado-image").find("a").find("img").attr("src", img);
			$("#resultado-image").find("a").find("img").attr("alt", name);
			$("#resultado-title").find("a").find("p").text(name);
			$("#resultado-title a, #resultado-image a").attr("href", uri);

			$("#descripcion").html(data[0]["description"]);

			var i = 0;
			var j = 0;
			var tipo = "odd";
			$.each(data[0]["allSpecifications"], function(key, val) {
				if (val != "Video" && val != "Video2" && val != "Video3" && val != "Manual" && val != "MELIID" && val != "MELI_MIN_STOCK" && val != "Bultos" && val != "Guía de compra 1" && val != "Guía de compra 2" && val != "Guía de compra 3") {
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
					_td.html(data[0][val][0]);

					_th.appendTo(_tr);
					_td.appendTo(_tr);

					_tr.css({
						"font-family": "Arial,Helvetica,'Nimbus Sans L',sans-serif",
						"font-size": "12px",
						"display": "table",
						"width": "100%",
						"margin": "0 0 5px"
					}).appendTo("#tabela");


				}
			});
			$(".resultado").show();
		});
		return false;
	});
	$(".preview-btn").on("click", function() {
		$(".resultado").hide();
		$(".preview").show();
		$(".code").hide();
		if ($("#fleteGratis").is(":checked")) {
			var img = "https://www.fravega.com/arquivos/mercado_libre_00007_1.jpg";
			$(".fleteGratis").attr("src", img);
		} else {
			var img = "https://www.fravega.com/arquivos/mercado_libre_00007_2.jpg";
			$(".fleteGratis").attr("src", img);
		}
		return false;
	});

	$(".codigo").on("click", function() {
		$(".resultado").hide();
		$(".preview").hide();
		$(".code").show();
		if ($("#fleteGratis").is(":checked")) {
			var img = "https://www.fravega.com/arquivos/mercado_libre_00007_1.jpg";
			$(".fleteGratis").attr("src", img);
		} else {
			var img = "https://www.fravega.com/arquivos/mercado_libre_00007_2.jpg";
			$(".fleteGratis").attr("src", img);
		}
		$("#code").text($(".preview").html());
		return false;
	});
});

$(document).ajaxStart(function() {
	$(".resultado").find("h1").show();
	$(".resultado").find("h1").text("carregando");
});

$(document).ajaxStop(function() {
	var texto = $(".resultado").find("h1");
	var resultado = $(".resultado").show();
	return (texto.text() == "Producto no encontrado o sin stock.") ? texto.show() : texto.hide();
});