$(document).ready(() => {

	var _spPageContextInfo = { webServerRelativeUrl: location.pathname.substring(0, location.pathname.lastIndexOf("/")) };
	var url = new URLSearchParams(window.location.search);
	var id = url.get('t');

	telemonitoreo = new Vue({
		el: "#sura-covid",
		data: {
			user: {},
			mensaje_1: formularios[0].values[0].texto,
			mensaje_2: "",
			contenido: {},
			activar: true,
			formulario: {},
			modal: null,
			env: _spPageContextInfo.webServerRelativeUrl == "/formularios/covid-19/automonitoreo" ? "pdn" : "labo"
		},
		created() {
			this.getData();
		},
		mounted() {
		},
		computed: {
		},
		updated() {
		},
		
		methods: {
			getData() {
				$.ajax({
					url: urls[this.env].validarIdAutogestion,
					contentType: 'application/json',
					type: 'POST',
					headers: { 'x-key': '1350361c-02e6-4f76-9721-75f2a9016a04' },
					data: JSON.stringify({ operacion: "Validar", contenido: id }),
					success(result) {
						telemonitoreo.user = JSON.parse(result);
						telemonitoreo.mensaje_1 = "";
						telemonitoreo.loadForm();
					},
					error: function () {
						telemonitoreo.mensaje_1 = formularios[0].values[1].texto;
					}
				});
			},
			loadForm() {
				switch (this.user.version) {
					case "3", "2":
						this.formulario = formularios[1].values[1];
						this.contenido = formularios[2].values[0];
						break;
					case "5.1":
						this.formulario = formularios[1].values[0];
						this.contenido = formularios[2].values[0];
						break;
					case "signos_vitales_kit1_v1":
						this.formulario = formularios[1].values[2];
						this.contenido = formularios[2].values[0];
						break;
					case "alta_positivos_asym":
						this.formulario = formularios[1].values[3];
						this.contenido = formularios[2].values[0];
						break;
					case "alta_sospechosos_asym":
						this.formulario = formularios[1].values[3];
						this.mensaje_2 = telemonitoreo.user.mensaje_autogestion;
						this.contenido = formularios[2].values[0];
						break;
					case "alta_positivos_sym":
						this.formulario = formularios[1].values[4];
						this.contenido = formularios[2].values[0];
						break;
					case "alta_sospechosos_sym":
						this.formulario = formularios[1].values[4];
						this.mensaje_2 = telemonitoreo.user.mensaje_autogestion;
						this.contenido = formularios[2].values[0];
						break;
					case "Encuesta_secuela_0_5":
						this.formulario = formularios[1].values[5];
						this.contenido = formularios[2].values[1];
						break;
					case "Encuesta_secuela_6_11":
						this.formulario = formularios[1].values[6];
						this.contenido = formularios[2].values[2];
						break;
					case "Encuesta_secuela_adulto":
						this.formulario = formularios[1].values[7];
						this.contenido = formularios[2].values[3];
						break;
					case "Encuesta_secuela_12_17":
						this.formulario = formularios[1].values[8];
						this.contenido = formularios[2].values[4];
						break;
					case "alta_positivos_sym_negative":
						this.formulario = formularios[1].values[9];
						this.contenido = formularios[2].values[0];
						break;
					default:
						break;
				}
			},
			sendData() {
				var contenido = telemonitoreo.formulario.values;

				if (this.formulario.title != "vitales") {
					contenido = telemonitoreo.formulario.values
						.map((item) => Object({
							id: item.id,
							title: item.title,
							respuesta:
								item.respuesta ? "SI" : "NO"
						}));
				}

				$.ajax({
					url: urls[this.env].enviarInfoAutogestion,
					contentType: 'application/json',
					type: 'POST',
					data: JSON.stringify({ contenido: contenido, token: id }),
					success: function () {
						$('#modalInfo').modal('toggle');
						$('#modalNotifi').modal();
					}
				});
			},
			validarData() {
				var invalid = $("#preguntas input:invalid");
				if (invalid.length > 0) {
					alert("Debe validar los datos sombreados en rojo antes de continuar.");
				} else {
					$('#modalInfo').modal();
				}
			}
		},
		filters: {
		}
	});


});