var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var posts = [
    {
      img: 'http://www.112brabant.nl/data/news/94/thumbnails/187810.jpg',
      loc: 'Steenbergen',
      desc: 'De A4 bij Steenbergen is woensdag tegen de middag richting Bergen op Zoom afgesloten vanwege een ongeval met een vrachtwagentje. Door nog onbekende oorzaak verloor de chauffeur van de BE-combi de macht over het stuur waardoor de combinatie begon te schuiven en uiteindelijk op zijn kop tegen de middengeleider tot stilstand kwam. Hoewel de cabine volledig werd platgedrukt kwam de chauffeur er wonderwel zonder kleerscheuren vanaf. Een bergingsbedrijf zal de combinatie weer terug op zijn wielen zetten en bergen. Hoelang de A4 richting Bergen op Zoom nog afgesloten blijft is niet bekend.',
      header: 'BE-combi op de kop op A4 bij Steenbergen'
    },
    {
      img: 'http://www.112brabant.nl/data/news/94/thumbnails/187806.jpeg',
      loc: 'Diessen',
      desc: 'In een paardenstal aan de Waterstraat in Diessen is woensdagmorgen brand uitgebroken. Het vuur ontstond rond 11.30 uur door nog onbekende oorzaak. Achttien paarden die in de stal stonden konden op tijd in veiligheid worden gebracht. De brandweer schaalde op naar code grote brand en zette veel materieel in om die te bestrijden. Overslag naar naastgelegen kon worden voorkomen en ook een dieseltank die langs de brandende stal stond kon worden afgeschermd. Bij de brand kwam veel rook vrij, de brandweer adviseert mensen om uit de rook te blijven. De brandweer verwacht nog enkele uren bezig te zijn met het blussen van de brand.',
      header: '18 paarden gered bij grote brand in stal Diesse'
    },
    {
      img: 'http://www.112brabant.nl/data/news/94/thumbnails/187802.jpg',
      loc: 'Oosterhout',
      desc: 'Bij een ongeval op de A27 ter hoogte van de oprit Oosterhout-Zuid is woensdagochtend een persoon gewond geraakt. Een andere bestuurder raakte lichtgewond en kon na een kleine behandeling weer verder. Onbekend is of het eerste slachtoffer mee naar het ziekenhuis is. Door nog onbekende oorzaak botsten twee personenwagens tegen elkaar. Naar eigen zeggen kwam dat omdat een vrachtwagen de invoegende auto’s geen ruimte gaf. Een andere vrachtwagen die op de A27 reed kon ternauwernood nog remmen. Door het krachtige remmen schoof zijn lading, een metalen plaat van 17 Ton, naar voren tegen de cabine aan.\r\nHet is een wonder dat er niet meer gewonden zijn en dat er relatief maar lichte schade is. Het bergen nam enige tijd in beslag vanwege de vrachtwagen. De andere twee voertuigen moesten door een berger getakeld en afgevoerd worden. Door het ongeval was er tijdelijk maar een rijstrook beschikbaar. De file liep al snel op. Rond 9.00 uur kon de weg weer worden vrijgegeven voor het verkeer.',
      header: 'Ongeval met auto\'s en vrachtwagen op A27 bij Oosterhout'
    }
  ];
  res.render('index', { title: 'Index', posts: posts });
});

module.exports = router;
