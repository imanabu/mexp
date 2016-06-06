
'use strict';
var app = app || {};

(function () {
	var STORAGE_ID = 'catpci-demo';
	app.storage = {
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},
		put: function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		}
	};
})();

// Device Model
app.Device = function (data) {
	this.name = m.prop(data.name);
	this.lesions = m.prop(data.lesions || []);
	this.diameter = m.prop(data.diameter || 0);
    this.length = m.prop(data.length || 0);
	this.id = m.prop(data.id);
};

app.NewDevice = function (newId) {
	return new app.Device({
		id: newId,
		name: "",
		lesions: [],
		diameter: 0,
		length: 0
	});
}

app.DevName = function (name, id) {
    this.id = m.prop(id);
    this.name = m.prop(name)
}

var approvedDevices = [
	"Accent Balloon",
	"Ace Balloon",
	"Andante Balloon",
	"AngioJet Xpeedior+120 Thrombectomy Catheter",
	"Angiosculpt Scoring Balloon Catheter",
	"ASAHI - Tornus",
	"Atherectomy - Peripheral (any mfr)",
	"AVX Thrombectomy Catheter",
	"Balloon - Peripheral (any mfr)",
	"Balloon from deployed stent",
	"BeStent2 w/ Discrete Tech OTW Stent",
	"Beta-Cath",
	"BioDivYsio Stents (phosphorylcholine)",
	"Blinded - Device type unknown",
	"Bx SONIC OTW Stent",
	"Bx SONIC OTW Stent with HEPACOAT",
	"Bx Velocity OTW Stent",
	"Bx Velocity OTW Stent with HEPACOAT",
	"Bx Velocity Rx Stent",
	"Bx Velocity RX Stent with HEPACOAT",
	"Cardio-Path",
	"Champion DES (Everlimus)",
	"Checkmate",
	"CROSSFLEX LC Stent (OTW)",
	"CROSSSAIL Coronary Dilatation Catheter",
	"Cutting Balloon Ultra Monorail",
	"Cutting Balloon Ultra OTW",
	"Cutting Balloon Ultra2 (OTW)",
	"Cutting Balloon Ultra2 Monorail",
	"Cypher Sirolimus-eluting Stent (OTW)",
	"Cypher Sirolimus-eluting Stent (Rx)",
	"Diver CE",
	"Driver MX2 (RX)",
	"Driver OTW Coronary Stent",
	"Driver Zipper MX Coronary Stent",
	"DuraStar RX Balloon Catheter",
	"DVX Thrombectomy Catheter",
	"Embolic Protection - Peripheral (any mfr)",
	"Endeavor Stent (OTW)",
	"Endeavor Stent MX2",
	"Endeavor Stent RX",
	"Export Catheter",
	"Export XT Catheter",
	"Express2 OTW stent",
	"Express2 RE stent",
	"Extraction Catheter - Peripheral (any mfr)",
	"Fetch Aspiration Catheter",
	"FilterWire EX Emoblic Protection System",
	"FilterWire EZ Embolic Protection System",
	"FireStar RX Balloon Catheter",
	"FLEXI-CUT Atherectomy",
	"Flextome Cutting Balloon Monorail",
	"Flextome Cutting Balloon OTW",
	"Frontrunner CTO Catheter",
	"FX miniRAIL Rx PTCA",
	"Galileo III",
	"Graft Ace Balloon",
	"GuardWire Temporary Occlusion",
	"HIGHSAIL Coronary Dilatation Catheter",
	"Intraluminal Safe-cross Catheter",
	"Jostent Coronary Stent Graft",
	"Jostent GraftMaster OTW",
	"L Ranger OTW Balloon",
	"Laser",
	"Liberte OTW Stent",
	"Liberte RE Stent",
	"Long Ace Balloon",
	"Magic WALLSTENT Self Expanding Stent",
	"Maverick OTW Balloon",
	"Maverick XL Monorail  RE Balloon",
	"Maverick(2) Monorail Balloon RE",
	"Merlin PTCA Catheter (OTW)",
	"Metricath Gemini Catheter",
	"Metricath GPS Catheter",
	"Micro Driver (OTW)",
	"Micro Driver MX2 (RX)",
	"Multi-Link Mini Vision OTW Stent",
	"Multi-Link Mini Vision RX Stent",
	"Multi-Link OTW ZETA Stent",
	"Multi-Link PENTA Stent",
	"Multi-Link Pixel Stent OTW",
	"Multi-Link Pixel Stent RX",
	"Multi-Link RX ZETA Stent",
	"Multi-Link TETRA Stent",
	"Multi-Link Ultra Stent - OTW",
	"Multi-Link Ultra Stent - RX",
	"Multi-Link Vision OTW Stent",
	"Multi-Link Vision RX Stent",
	"NC Merlin PTCA Catheter (OTW)",
	"NC Monorail Balloon RE",
	"NC Ranger OTW Balloon",
	"NC RAPTOR OTW PTCA",
	"NC Stormer OTW Balloon",
	"NC Stormer Zipper MX",
	"Ninja FX OTW PTCA",
	"NIR Elite Monorail RE Stent",
	"NIR Elite OTW Stent",
	"OPENSAIL Coronary Dilatation Catheter",
	"Percusurge",
	"Pivot Balloon Catheter",
	"Place Holder - Device not in list",
	"POWERSAIL Coronary Dilatation Catheter",
	"Pronto Extraction Catheter",
	"Proxis Embolic Protection System",
	"Quantum Maverick OTW Balloon",
	"Quantum Maverick RE Balloon",
	"Quantum Ranger OTW Balloon",
	"QuickCat Extraction Catheter",
	"R Stent Evolution",
	"R Stent Prodigy",
	"R Stent SVS (small vessel system)",
	"Radius Self Expanding Stent",
	"RAPTOR OTW PTCA",
	"RAPTORRAIL RE PTCA",
	"Rinspirator System",
	"Rio Aspiration Catheter",
	"Rithron-XR Coronary Stent System",
	"Rotablator rotational atherectomy system",
	"RX ESPRIT Coronary Dilation Balloon",
	"S660 with Discrete Technology OTW Stent",
	"S670 with Discrete Technology OTW Stent",
	"S7 with Discrete Technology OTW Stent",
	"S7 Zipper MX Multi-Exchange Stent",
	"Silver Hawk Plaque Excision System",
	"SLK-View",
	"SpiderFX Embolic Protection",
	"SpideRx Embolic Protection",
	"Spiroflex",
	"Spiroflex Ultra",
	"Spiroflex VG Thrombectomy Catheter",
	"Sprinter Balloon",
	"Sprinter MX2 (RX)",
	"Sprinter OTW",
	"Stent - Peripheral (any mfr)",
	"Stormer OTW Balloon",
	"Stormer Zipper MX",
	"Surpass Superfusion Perfusion Catheter",
	"Symbiot Covered Stent (ePTFE polymer)",
	"Tacrolimus Eluting Stent",
	"Taxus Express 2 Monorail Drug Eluting Stent",
	"Taxus Express 2 OTW Drug Eluting Stent",
	"Taxus Liberte Paclitaxel-Eluting Stent",
	"Tenax-XR Amorphous Silicon Carb. Coated Stent",
	"Teneo coronary stent",
	"Thrombectomy Catheter - Peripheral (any mfr)",
	"TITAN MEGA PTCA",
	"Transluminal Extraction Catheter (TEC)",
	"Trerotola PTD Rotator Drive Unit",
	"TriActiv",
	"Viva Balloon",
	"Voyager OTW Balloon",
	"Voyager Rx Coronary Dilation Catheter",
	"XMI Ultra Thrombectomy Catheter",
	"XMI-OTW Thrombectomy Catheter",
	"XMI-RX Thrombectomy Catheter",
	"X-Sizer",
	"Xtract Catheter",
	"XVG Thrombectomy Catheter",
	"XVG Ultra Thrombectomy Catheter"
];


// Device Selections



