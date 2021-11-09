$(document).ready(() => {

	var _spPageContextInfo = { webServerRelativeUrl: location.pathname.substring(0, location.pathname.lastIndexOf("/")) };
	var url = new URLSearchParams(window.location.search);
	var id = url.get('t');

	telemonitoreo = new Vue({
		el: "#sura-covid",
		data: {
			datos_poliza: {
				fecha_hoy: '',
				fecha_nacimiento: '',
				telefono: '',
				celular: '',
				direccion: '',
				departamento_municipio: '',
				nacionalidad: '',
				eps: '',
				edad: '',
				fecha_sisntomas: '',
				fecha_estrecho: '',
				regimen: '',
				embarazo: '',
				quimioterapia: '',
				inmunosupresores: '',
				vacunado: '',
				vacuna_dosis: '',
				vacuna_fecha: '',
				vacuna_nombre: '',
				uso_antibioticos: '',
				uso_antivirales: '',
				ha_fumado: '',
				canales: '',
				correo: '',
				correo_electronico: '',
				autorizacion_virtual: '',
				whatsapp: '',
				numero_whatsap: '',
				msm: '',
				llamada_robot: '',
				telefono_robot: '',
			},
			fecha_nacimiento: moment().format("DD/MM/YYYY"),
			pais: "",
			departamento: "",
			ciudad: "",
			edad: "",
			token_valido: "",
			id: "",
			tipoid: "",
			regimen: "",
			sexo: "",
			vacunado: '',
			embarazo: '',
			quimioterapia: '',
			inmunosupresores: '',
			uso_antibioticos: '',
			uso_antivirales: '',
			ha_fumado: '',
			canales: '',
			maestros: {},
			maestras: maestras,
			infoVacuna: {},
			vacunado: '',
			vacuna_dosis: '',
			vacuna_fecha: '',
			vacuna_nombre: {
				nombre: "",
				codigo: "",
			},
			user: {},
			tipo_usuario: '',
			datosPersonales: {},
			datosPersonalesPoliza: {},
			validar_poliza: {},
			verificar_autogestion: {},
			autorizacion_virtual: "",
			whatsap: "",
			numero_whatsap: "",
			correo: "",
			correo_electronico: "",
			msm: "",
			llamada_robot: "",
			telefono_robot: "",
			contenido: {},
			result_send_data: {},
			activar: true,
			pos_activo: false,
			fechahoy:"",
			eps: {
				titulo: '',
				codigo: '',
			},
			ciudaDepartamento:{
				cod:"",
				nombre: "",
			},
			formulario: {},
			formulario_ok: "",
			formulario_mensaje: "Formulario completo",
			modal: null,
			errors: [],
			errores_validacion: [],
			telefono1: "",
			telefono2: "",
			datosnegativos: "",
			mensaje_1: formularios[0].values[0].texto,
			mensaje_2: "hola desde mensaje 2",
			mensaje_3: "Canales de seguimiento",
			mensaje_4: "No hay datos de vacuación por favor llene los siguientes datos",
			mensaje_5: formularios[1].values[0].content1,
			env: _spPageContextInfo.webServerRelativeUrl == "/formularios/covid-19/caso5" ? "pdn" : "labo"
		},
		created() {
			this.getData();
			this.getMaestras();
		},
		mounted() {
		},
		computed: {
		},
		updated() {
		},
		methods: {

			checkForm() {

				telemonitoreo.errors = [];
				if (!telemonitoreo.regimen) {
					telemonitoreo.errors.push("El regimen es obligatorio");
				} if (!telemonitoreo.embarazo) {
					telemonitoreo.errors.push("La pregunta embarazo es obligatorio");
				} if (!telemonitoreo.quimioterapia) {
					telemonitoreo.errors.push("La pregunta quimioterapia es obligatorio");
				} if (!telemonitoreo.inmunosupresores) {
					telemonitoreo.errors.push("La pregunta inmunosupresores es obligatorio");
				} if (!telemonitoreo.uso_antibioticos) {
					telemonitoreo.errors.push("La pregunta de antibióticos es obligatoria");
				} if (!telemonitoreo.uso_antivirales) {
					telemonitoreo.errors.push("La pregunta de abtivirales es obligatoria");
				} if (!telemonitoreo.ha_fumado) {
					telemonitoreo.errors.push("La pregunta de ha fumado es obligatoria");
				} if (!telemonitoreo.canales) {
					telemonitoreo.errors.push("La pregunta de canales virtuales es obligatorio");
				} if (!telemonitoreo.correo_electronico) {
					this.errors.push('El correo electrónico es obligatorio.');
				} else if (!telemonitoreo.validEmail(telemonitoreo.correo_electronico)) {
					this.errors.push('El correo electrónico debe ser válido.');
				}
				if (!telemonitoreo.errors.length) {

					telemonitoreo.formulario_ok = 1
					telemonitoreo.formulario_mensaje = "El formulario esta listo para enviar"
					$('#modalInfo').modal();
				}

				$('#modalInfo').modal();
			},
			checkFormPoliza() {

				telemonitoreo.errors = [];
				if (!telemonitoreo.datos_poliza.regimen) {
					telemonitoreo.errors.push("El regimen es obligatorio");
				} if (!telemonitoreo.datos_poliza.embarazo) {
					telemonitoreo.errors.push("La pregunta embarazo es obligatorio");
				} if (!telemonitoreo.datos_poliza.quimioterapia) {
					telemonitoreo.errors.push("La pregunta quimioterapia es obligatorio");
				} if (!telemonitoreo.datos_poliza.inmunosupresores) {
					telemonitoreo.errors.push("La pregunta inmunosupresores es obligatorio");
				} if (!telemonitoreo.datos_poliza.uso_antibioticos) {
					telemonitoreo.errors.push("La pregunta de antibióticos es obligatoria");
				} if (!telemonitoreo.datos_poliza.uso_antivirales) {
					telemonitoreo.errors.push("La pregunta de abtivirales es obligatoria");
				} if (!telemonitoreo.datos_poliza.ha_fumado) {
					telemonitoreo.errors.push("La pregunta de ha fumado es obligatoria");
				} if (!telemonitoreo.datos_poliza.canales) {
					telemonitoreo.errors.push("La pregunta de canales virtuales es obligatorio");
				} if (!telemonitoreo.datos_poliza.correo_electronico) {
					this.errors.push('El correo electrónico es obligatorio.');
				} else if (!telemonitoreo.validEmail(telemonitoreo.datos_poliza.correo_electronico)) {
					this.errors.push('El correo electrónico debe ser válido.');
				}
				if (!telemonitoreo.errors.length) {
					telemonitoreo.formulario_ok = 1
					telemonitoreo.formulario_mensaje = "El formulario esta listo para enviar"
					$('#modalInfo').modal();
				}
				$('#modalInfo').modal();
			},
			validEmail(email) {
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(email);
			},
			editarData() {
				$('#modalEdit').modal();
			},
			getData() {
				$.ajax({
					url: urls[this.env].validarIdAutogestion,
					contentType: 'application/json',
					type: 'POST',
					headers: { 'x-key': '1350361c-02e6-4f76-9721-75f2a9016a04' },
					data: JSON.stringify({ operacion: "Validar", contenido: id }),

					success(result) {
						console.log(result);
						telemonitoreo.user = JSON.parse(result);
						telemonitoreo.mensaje_1 = "";

						var id = telemonitoreo.user.id;
						var tipoid = telemonitoreo.user.tipoId;
						var codCiudad = "";
						if (telemonitoreo.user) {
							telemonitoreo.verificarAutogestion(id, tipoid);
						} if (telemonitoreo.user) {
							telemonitoreo.validarPoliza(id, tipoid, codCiudad);
						} if (telemonitoreo.user) {
							telemonitoreo.getDatosPersonales(id, tipoid);
							telemonitoreo.getDatosPersonalesPoliza(id, tipoid)
						} if (telemonitoreo.user) {
							telemonitoreo.getDatosVacunas(id, tipoid);
						}
					},
					error: function () {
						telemonitoreo.mensaje_1 = formularios[0].values[1].texto;
					}
				});
			},
			verificarAutogestion(id, tipoid) {
				var cedula = id;
				var tipodocumento = tipoid;
				if (cedula != null) {
					$.ajax({
						url: urls[this.env].verificarAutogestion,
						type: "GET",
						headers: {
							'id': cedula,
							'tipoid': tipodocumento,
						},
						success(result) {
							telemonitoreo.verificar_autogestion = JSON.parse(result);
							console.log(telemonitoreo.verificar_autogestion);
						},
						error: function () {
							console.log('error');
						}
					});

				} else {
					console.log('el usuario no tiene informacion de vacunacion');
					telemonitoreo.infoVacuna = {};
				}

			},
			getMaestras() {
				$.ajax({
					url: urls[this.env].obtenerMaestros,
					contentType: 'application/json',
					type: 'POST',
					data: JSON.stringify({
						'xkey': '1350361c-02e6-4f76-9721-75f2a9016a04'
					}),
					success(result) {
						telemonitoreo.maestros = result.maestros
						if (telemonitoreo.maestras) {
							console.log('hay datos de maestras');
						} else {
							console.log('No hay datos de maestras');
						}
					},
					error: function () {
						console.log('error en la peticion de maestras');
					}
				});

			},
			getDatosVacunas(id, tipoid) {

				var cedula = id;
				var tipodocumento = tipoid;

				if (cedula != null) {
					$.ajax({
						url: urls[this.env].obtenerDatosVacunas,
						type: "GET",
						headers: {
							'id': cedula,
							'tipoid': tipodocumento,
						},
						success(result) {
							if (result) {
								telemonitoreo.infoVacuna = JSON.parse(result);
								console.log(telemonitoreo.infoVacuna);
								telemonitoreo.vacunado = "7875_Si"
								telemonitoreo.vacuna_dosis = telemonitoreo.infoVacuna[0].biologicoVacuna.numeroDosis;
								var dia = telemonitoreo.infoVacuna[0].biologicoVacuna.dosisVacuna[0].fechaAplicacion.dayOfMonth;
								var mes = telemonitoreo.infoVacuna[0].biologicoVacuna.dosisVacuna[0].fechaAplicacion.month;
								var ano = telemonitoreo.infoVacuna[0].biologicoVacuna.dosisVacuna[0].fechaAplicacion.year;
								var fechavacuna = "" + dia + "-" + mes + "-" + ano + "";
								telemonitoreo.vacuna_fecha = fechavacuna;
								telemonitoreo.vacuna_nombre.nombre = telemonitoreo.infoVacuna[0].biologicoVacuna.nombreCorto;
								telemonitoreo.codigoIpsa = telemonitoreo.infoVacuna[0].biologicoVacuna.codigo

								var codigo = maestras[0].values.filter(x => {							
									if (x.codIpsa === telemonitoreo.codigoIpsa &&
										x.dosisipsa === telemonitoreo.infoVacuna[0].biologicoVacuna.numeroDosis) {
										return x
									}
								});

								telemonitoreo.vacuna_nombre.codigo = codigo[0].codigo

							} else {
								console.log('no hay datos de vacunacion');
							}
						},
						error: function () {
							console.log('Error en la peticion de vacunas');
						}
					});

				} else {
					console.log('el usuario no tiene informacion de vacunacion');
					telemonitoreo.infoVacuna = {};
				}
			},
			validarPoliza(id, tipoid, idciudad) {

				var cedula = id;
				var tipodocumento = "";
				var codCiudad = idciudad;


				switch (tipoid) {
					case "CC":
						tipodocumento = "C";
						break;
					case "CE":
						tipodocumento = "E";
						break;
					case "PA":
						tipodocumento = "P";
						break;
					case "RC":
						tipodocumento = "R";
						break;
					case "TI":
						tipodocumento = "T";
						break;
					case "ASI":
						tipodocumento = "C";
						break;
					case "MSI":
						tipodocumento = "M";
						break;
					case "CA":
						tipodocumento = "C";
						break;
					case "PD":
						tipodocumento = "D";
						break;
					case "NI":
						tipodocumento = "A";
						break;
					case "RP":
						tipodocumento = "L";
						break;
					case "TE":
						tipodocumento = "X";
						break;
					case "NU":
						tipodocumento = "N";
						break;
					case "NP":
						tipodocumento = "C";
						break;
					case "MS":
						tipodocumento = "M";
						break;
					case "CD":
						tipodocumento = "C";
						break;
					case "PC":
						tipodocumento = "C";
						break;
					case "NA":
						tipodocumento = "Z";
						break;
					case "CN":
						tipodocumento = "C";
						break;
					case "SC":
						tipodocumento = "C";
						break;
					case "PO":
						tipodocumento = "C";
						break;
					case "PF":
						tipodocumento = "PF";
						break;
					case "PE":
						tipodocumento = "TE";
						break;
					case "PT":
						tipodocumento = "PT";
						break;
					default:
						break;
				}
				if (cedula != null) {
					$.ajax({
						url: urls[this.env].validarPoliza,
						type: "GET",
						headers: {
							'id': cedula,
							'tipoid': tipodocumento,
							'ciudadid': codCiudad
						},

						success(result) {
							telemonitoreo.validarPoliza = JSON.parse(result);
							if (telemonitoreo.validarPoliza) {
								console.log('validacion hada' + telemonitoreo.validarPoliza);
							} else {
								console.log('no hay datos de hada');
							}
						},
						error: function () {
							console.log('error');
						}
					});

				} else {
					console.log('el usuario no tiene informacion de vacunacion');
					telemonitoreo.infoVacuna = {};
				}
			},
			calcularEdad(dateString, yearFirst) {
				if (!dateString) return "";

				var sep = dateString.indexOf("/") > 0 ? "/" : "-";
				var splits = dateString.split(" ")[0].split(sep);
				var birthday = yearFirst ? new Date(Number(splits[0]), Number(splits[1]) - 1, Number(splits[2])) : new Date(Number(splits[2]), Number(splits[1]) - 1, Number(splits[0]));
				var ageDifMs = Date.now() - birthday.getTime();
				var ageDate = new Date(ageDifMs); // miliseconds from epoch
				return Math.abs(ageDate.getUTCFullYear() - 1970);
			},
			getDatosPersonales(id, tipoid) {
				var cedula = id;
				var tipodocumento = '';

				switch (tipoid) {
					case "CC":
						tipodocumento = 1;
						break;
					case "CE":
						tipodocumento = 2;
						break;
					case "PA":
						tipodocumento = 4;
						break;
					case "RC":
						tipodocumento = 6;
						break;
					case "TI":
						tipodocumento = 8;
						break;
					case "ASI":
						tipodocumento = 0;
						break;
					case "MSI":
						tipodocumento = 11;
						break;
					case "CA":
						tipodocumento = 0;
						break;
					case "PD":
						tipodocumento = 5;
						break;
					case "NI":
						tipodocumento = 3;
						break;
					case "RP":
						tipodocumento = 10;
						break;
					case "TE":
						tipodocumento = 7;
						break;
					case "NU":
						tipodocumento = 9;
						break;
					case "NP":
						tipodocumento = 0;
						break;
					case "MS":
						tipodocumento = 0;
						break;
					case "CD":
						tipodocumento = 15;
						break;
					case "PC":
						tipodocumento = 0;
						break;
					case "NA":
						tipodocumento = 99;
						break;
					case "CN":
						tipodocumento = 16;
						break;
					case "SC":
						tipodocumento = 17;
						break;
					case "PO":
						tipodocumento = 0;
						break;
					case "PF":
						tipodocumento = 19;
						break;
					case "PE":
						tipodocumento = 18;
						break;
					case "PT":
						tipodocumento = 20;
						break;
					default:
						break;
				}

				if (cedula != null) {
					$.ajax({
						url: urls[this.env].obtenerDatosPersonales,
						type: "GET",
						headers: {
							'id': cedula,
							'tipoid': tipodocumento,
						},
						success(result) {
							if (result == '0') {
								console.log('No Hay datos Pos Para mostrar');
								telemonitoreo.datosnegativos = 0;
							} else {
								var msgdata = (typeof jsonObject == "object" ? jsonObject : JSON.parse(result));
								telemonitoreo.datosPersonales = msgdata;
								telemonitoreo.tipo_usuario = "POS"
								console.log('Datos Pos' + telemonitoreo.datosPersonales)
								telemonitoreo.telefono1 = (telemonitoreo.datosPersonales.Envelope.Body.consultarAfiliadoExtendidoResponse.afiliadoConsultaExtendido.telefono).toString();
								telemonitoreo.telefono2 = (telemonitoreo.datosPersonales.Envelope.Body.consultarAfiliadoExtendidoResponse.afiliadoConsultaExtendido.ubicacion.telefono).toString();
								telemonitoreo.fecha_nacimiento = moment(telemonitoreo.datosPersonales.Envelope.Body.consultarAfiliadoExtendidoResponse.afiliadoConsultaExtendido.fechaNacimiento).format("DD-MM-YYYY");
								telemonitoreo.edad = telemonitoreo.calcularEdad(telemonitoreo.fecha_nacimiento, true).toString();
								telemonitoreo.pos_activo = telemonitoreo.datosPersonales.Envelope.Body.consultarAfiliadoExtendidoResponse.afiliadoConsultaExtendido.tienePOS;
								telemonitoreo.correo_electronico = telemonitoreo.datosPersonales.Envelope.Body.consultarAfiliadoExtendidoResponse.afiliadoConsultaExtendido.ubicacion.direccionElectronica;
								var date = new Date();
								telemonitoreo.fecha_hoy = moment(date).format("DD-MM-YYYY HH:mm:ss");
								console.log('fecha hoy'+ telemonitoreo.fecha_hoy);
								if (telemonitoreo.pos_activo == true) {
									telemonitoreo.eps.titulo = '36077_SURA E.P.S';
									telemonitoreo.eps.codigo = 'EMP021'
								}
								var sexo = telemonitoreo.datosPersonales.Envelope.Body.consultarAfiliadoExtendidoResponse.afiliadoConsultaExtendido.sexo;
								switch (sexo) {
									case 'M':
										telemonitoreo.sexo = "Masculino"
										break;
									case 'F':
										telemonitoreo.sexo = "Femenino"
										break;
									case 'I':
										telemonitoreo.sexo = "Indeterminado"
										break;
									default:
										break;
								}
								var ciudaspos = telemonitoreo.datosPersonales.Envelope.Body.consultarAfiliadoExtendidoResponse.afiliadoConsultaExtendido.ubicacion.municipio

								var ciudad = maestras[2].values.filter(x => {
									if (ciudaspos == parseInt(x.external_code)) {
										return x
									}
								})
								var codCiudad = ciudad[0].concept_id;
								var nomCiudad = ciudad[0].name;
								telemonitoreo.ciudaDepartamento.cod = codCiudad+'_'+nomCiudad;
								telemonitoreo.ciudaDepartamento.nombre = ciudad[0].name;
								

							}
						},
						error: function () {
							console.log('error en la solicitud de usuario Pos');
						}
					});

				} else {
					alert('No se cedula datos del usuario Pos');
				}
			},
			getDatosPersonalesPoliza(id, tipoid) {
				var cedula = id;
				var tipodocumento = tipoid;

				if (cedula != null) {
					$.ajax({
						url: urls[this.env].obtenerDatosPersonalesPoliza,
						type: "GET",
						headers: {
							'id': cedula,
							'tipoid': tipodocumento,
						},
						success(result) {
							if (result == '0') {
								console.log('no haydatos de poliza para mostrar');
							} else {
								var msgdata = (typeof jsonObject == "object" ? jsonObject : JSON.parse(result));
								telemonitoreo.datosPersonalesPoliza = msgdata.Envelope.Body.getInformacionBeneficiarioPACResponse;
								telemonitoreo.datos_poliza.fecha_nacimiento = moment(telemonitoreo.datosPersonalesPoliza.informacionBeneficiario.feNacimiento).format("DD-MM-YYYY");
								telemonitoreo.datos_poliza.edad = telemonitoreo.calcularEdad(telemonitoreo.datos_poliza.fecha_nacimiento, true).toString();
								telemonitoreo.datos_poliza.fecha_hoy = Date(Date.parse("2012-01-26T13:51:50.417-07:00"));
								//telemonitoreo.datos_poliza.nacionalidad =
								telemonitoreo.tipo_usuario = "POLIZA"
								console.log('Datos Poliza' + telemonitoreo.datosPersonalesPoliza);
								var sexo = telemonitoreo.datosPersonalesPoliza.informacionBeneficiario.dsSexo;
								switch (sexo) {
									case 'M':
										telemonitoreo.datos_poliza.sexo = "Masculino"
										break;
									case 'F':
										telemonitoreo.datos_poliza.sexo = "Femenino"
										break;
									case 'I':
										telemonitoreo.datos_poliza.sexo = "Indeterminado"
										break;
									default:
										break;
								}
							}
						},
						error: function () {
							console.log('error');
						}
					});

				} else {
					alert('No se encontraron datos del usuario');
				}
			},
			gurdarFormulario(tipoUser) {

				if (tipoUser == 'POS') {
					telemonitoreo.sendData();
				} else if (tipoUser == 'POLIZA') {
					telemonitoreo.sendDataPoliza();
				}
			},
			sendData() {

				data = {
					"presents_alarm_signs": "7875_Si",
					"close_contact_with_diagnosticated_covid_person": "7875_Si",
					"is_health_personal": "7875_Si",
					"is_signs_covid_present": "7875_Si",
					"is_chemotherapy_person": "7875_Si",
					"is_immunosuppression_person": "7875_Si",
					"is_pregnant_person": "7875_Si",
					"upgd_state": "05",
					"upgd_city": "001",
					"upgd_code": "04259",
					"upgd_subindex": "44",
					"upgd": "IPS Sura Virtual",
					"event_name": "Infección Respiratoria por virus nuevo",
					"event_code": "346",
					"created_date": telemonitoreo.fecha_hoy,
					"person_type_id": telemonitoreo.user.tipoId,
					"person_id": telemonitoreo.user.id,
					"first_name": telemonitoreo.datosPersonales.Envelope.Body.consultarAfiliadoExtendidoResponse.afiliadoConsultaExtendido.primerNombre,
					"middle_name": telemonitoreo.datosPersonales.Envelope.Body.consultarAfiliadoExtendidoResponse.afiliadoConsultaExtendido.segundoNombre,
					"family_name_1": telemonitoreo.datosPersonales.Envelope.Body.consultarAfiliadoExtendidoResponse.afiliadoConsultaExtendido.primerApellido,
					"family_name_2": telemonitoreo.datosPersonales.Envelope.Body.consultarAfiliadoExtendidoResponse.afiliadoConsultaExtendido.segundoApellido,
					"phone": telemonitoreo.telefono1,
					"cellphone": telemonitoreo.telefono2,
					"email": telemonitoreo.correo_electronico,
					"birthday": telemonitoreo.fecha_nacimiento,
					"person_age": telemonitoreo.edad,
					"person_age_unit": "29746_Años",
					"person_gender": telemonitoreo.datosPersonales.Envelope.Body.consultarAfiliadoExtendidoResponse.afiliadoConsultaExtendido.sexo,
					"ocurrence_country": "170 - COLOMBIA",
					"ocurrence_city_state": telemonitoreo.ciudaDepartamento.cod,
					"ocurrence_state": "05",
					"ocurrence_city": "001",
					"occurrence_area": "35802_Cabecera municipal",
					"occurrence_location_case": "No aplica",
					"occurrence_neighborhood_case": "No aplica",
					"town_or_rural_center": "No aplica",
					"rural_zone": "No aplica",
					"person_occupation": "Comerciante",
					"health_regime_type": telemonitoreo.regimen,
					"administrator_of_benefit_plans_code": telemonitoreo.eps.codigo,
					"administrator_of_benefit_plans_name": telemonitoreo.eps.titulo,
					"ethnicity": "36314_Otro",
					"stratum": "No aplica",
					"population_groups": "36320_Otros grupos poblacionales",
					"source": "35886_Notificación rutinaria",
					"nationality": "170 - COLOMBIA",
					"city_state": "33935_MEDELLIN - ANTIOQUIA",
					"state": "05",
					"city": "001",
					"residence_address": telemonitoreo.datosPersonales.Envelope.Body.consultarAfiliadoExtendidoResponse.afiliadoConsultaExtendido.ubicacion.direccion,
					"start_signs_date": "12-06-2021",
					"initial_case_classification": "36170_Probable",
					"hospitalized": "7876_No",
					"hospitalization_date": "",
					"final_condition": "35891_Vivo",
					"death_date": "No aplica",
					"death_certificate_number": "No aplica",
					"death_basic_cause": "No aplica",
					"prof_filled_out": "IPS Sura Virtual",
					"prof_phone": "3108881",
					"tracing_final_classification_case": "No aplica",
					"adjustment_date": "No aplica",
					"traveled_to_areas_virus_is_present": "7876_No",
					"national_trip": "7876_No",
					"national_trip_location": "No aplica",
					"international_trip": "7876_No",
					"international_trip_location": "No aplica",
					"close_contact_past_14_days_covid_case": "7875_Si",
					"symptoms": "No aplica",
					"clinical_antecedents": "No aplica",
					"take_chest_x_ray": "35884_Ninguno",
					"close_contact_unprotect_date": "01-11-2021",
					"is_vaccinated": telemonitoreo.vacunado,
					"dose": telemonitoreo.vacuna_dosis,
					"last_dose_date": telemonitoreo.vacuna_fecha,
					"vaccine": telemonitoreo.vacuna_nombre.codigo,
					"used_antibiotic_last_week": telemonitoreo.uso_antibioticos,
					"used_antibiotic_start_date": "",
					"used_antiviral_last_week": telemonitoreo.uso_antivirales,
					"used_antiviral_start_date": "",
					"smoke_last_6_months": telemonitoreo.ha_fumado,
					"is_authorized_for_covid_tracing": telemonitoreo.canales,
					"covid_case_interpretation": "35585_Sospechoso",
					"covid_case_addressing": "33161_Seguimiento virtual",
					"last_test_covid_result": "33167_Pendiente",
					"prof_type_id": "CC",
					"prof_id": "78546213",
					"prof_login": "JUANACRO",
					"ips": "140111",
					"role": "1",
					"consumer_type": "idPropia",
					"authorize_self_management_ws": telemonitoreo.whatsap,
					"authorize_self_management_email": telemonitoreo.correo,
					"authorize_self_management_text_form": telemonitoreo.msm,
					"authorize_self_management_voicebot": telemonitoreo.llamada_robot
				}

				console.log(data);

				$.ajax({
					url: urls[this.env].enviarInfoAutogestion,
					contentType: 'application/json',
					type: 'POST',
					data:  JSON.stringify(data),
					
					success (result) {
						console.log(result);
						telemonitoreo.result_send_data = result;
						$('#modalNotifi').modal();
						
					},
					error: function () {
						console.log('error');
					}
				});
				

			},
			sendDataPoliza() {

				data = {
					"presents_alarm_signs": "7875_Si",
					"close_contact_with_diagnosticated_covid_person": "7875_Si",
					"is_health_personal": "7875_Si",
					"is_signs_covid_present": "7875_Si",
					"is_chemotherapy_person": "7875_Si",
					"is_immunosuppression_person": "7875_Si",
					"is_pregnant_person": "7875_Si",
					"upgd_state": "05",
					"upgd_city": "001",
					"upgd_code": "04259",
					"upgd_subindex": "44",
					"upgd": "IPS Sura Virtual",
					"event_name": "Infección Respiratoria por virus nuevo",
					"event_code": "346",
					"created_date": telemonitoreo.datos_poliza.fecha_hoy,
					"person_type_id": telemonitoreo.user.id,
					"person_id": telemonitoreo.user.tipoId,
					"first_name": telemonitoreo.datosPersonalesPoliza.informacionBeneficiario.dsNombre1,
					"middle_name": telemonitoreo.datosPersonalesPoliza.informacionBeneficiario.dsNombre2,
					"family_name_1": telemonitoreo.datosPersonalesPoliza.informacionBeneficiario.dsApellido1,
					"family_name_2": telemonitoreo.datosPersonalesPoliza.informacionBeneficiario.dsApellido2,
					"phone": telemonitoreo.datos_poliza.telefono,
					"cellphone": telemonitoreo.datos_poliza.celular,
					"email": telemonitoreo.datos_poliza.correo_electronico,
					"birthday": telemonitoreo.datos_poliza.fecha_nacimiento,
					"person_age": telemonitoreo.datos_poliza.edad,
					"person_age_unit": "29746_Años",
					"person_gender": telemonitoreo.datosPersonalesPoliza.informacionBeneficiario.dsSexo,
					"ocurrence_country": telemonitoreo.datos_poliza.nacionalidad,
					"ocurrence_city_state": telemonitoreo.datos_poliza.departamento_municipio,
					"ocurrence_state": "05",
					"ocurrence_city": "001",
					"occurrence_area": "35802_Cabecera municipal",
					"occurrence_location_case": "No aplica",
					"occurrence_neighborhood_case": "No aplica",
					"town_or_rural_center": "No aplica",
					"rural_zone": "No aplica",
					"person_occupation": "Comerciante",
					"health_regime_type": "36161_C. Contributivo",
					"administrator_of_benefit_plans_code": "EPS010",
					"administrator_of_benefit_plans_name": telemonitoreo.datos_poliza.eps,
					"ethnicity": "36314_Otro",
					"stratum": "No aplica",
					"population_groups": "36320_Otros grupos poblacionales",
					"source": "35886_Notificación rutinaria",
					"nationality": telemonitoreo.datos_poliza.nacionalidad,
					"city_state": telemonitoreo.datos_poliza.departamento_municipio,
					"state": "05",
					"city": "001",
					"residence_address": telemonitoreo.datos_poliza.direccion,
					"start_signs_date": "12-06-2021",
					"initial_case_classification": "36170_Probable",
					"hospitalized": "7876_No",
					"hospitalization_date": "",
					"final_condition": "35891_Vivo",
					"death_date": "No aplica",
					"death_certificate_number": "No aplica",
					"death_basic_cause": "No aplica",
					"prof_filled_out": "IPS Sura Virtual",
					"prof_phone": "3108881",
					"tracing_final_classification_case": "No aplica",
					"adjustment_date": "No aplica",
					"traveled_to_areas_virus_is_present": "7876_No",
					"national_trip": "7876_No",
					"national_trip_location": "No aplica",
					"international_trip": "7876_No",
					"international_trip_location": "No aplica",
					"close_contact_past_14_days_covid_case": "7875_Si",
					"symptoms": "No aplica",
					"clinical_antecedents": "No aplica",
					"take_chest_x_ray": "35884_Ninguno",
					"close_contact_unprotect_date": "01-11-2021",
					"is_vaccinated": telemonitoreo.vacunado,
					"dose": telemonitoreo.vacuna_dosis,
					"last_dose_date": telemonitoreo.vacuna_fecha,
					"vaccine": telemonitoreo.vacuna_nombre,
					"used_antibiotic_last_week": telemonitoreo.datos_poliza.uso_antibioticos,
					"used_antibiotic_start_date": "",
					"used_antiviral_last_week": telemonitoreo.datos_poliza.uso_antivirales,
					"used_antiviral_start_date": "",
					"smoke_last_6_months": telemonitoreo.datos_poliza.ha_fumado,
					"is_authorized_for_covid_tracing": telemonitoreo.datos_poliza.canales,
					"covid_case_interpretation": "35585_Sospechoso",
					"covid_case_addressing": "33161_Seguimiento virtual",
					"last_test_covid_result": "33167_Pendiente",
					"prof_type_id": "CC",
					"prof_id": "78546213",
					"prof_login": "JUANACRO",
					"ips": "140111",
					"role": "1",
					"consumer_type": "idPropia",
					"authorize_self_management_ws": telemonitoreo.datos_poliza.whatsapp,
					"authorize_self_management_email": telemonitoreo.datos_poliza.correo,
					"authorize_self_management_text_form": telemonitoreo.datos_poliza.msm,
					"authorize_self_management_voicebot": telemonitoreo.datos_poliza.llamada_robot
				}
				console.log(data);
				/*
				$.ajax({
					url: urls[this.env].enviarInfoAutogestion,
					contentType: 'application/json',
					type: 'POST',
					data:  JSON.stringify(data),
					
					success (result) {
						console.log(result);
						telemonitoreo.result_send_data = result;
						$('#modalNotifi').modal();
						
					},
					error: function () {
						console.log('error');
					}
				});
				*/

			},
			closeVentana() {
				window.close();
			}
		},
		filters: {
		}
	});


});