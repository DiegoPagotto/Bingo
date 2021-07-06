$(document).ready(function () {
    $('#cartelas').hide();
});

$("#cadastrar-cartelas").click(function () {
    for (var i = 0; i < 4; i++) {
        var gerados = [];
        for (var x = 1; x < 6; x++) {
            for (var y = 0; y < 5; y++) {
                do {
                    var num = Math.floor(Math.random() * 75) + 1;
                } while (gerados.indexOf(num) != -1);
                gerados.push(num);
                $("table:eq(" + i + ") tr:eq(" + x + ") td:eq(" + y + ")").text(num);
            }
        }
    }
    $('#cadastrar-cartelas').attr('disabled', 'true');
    $('#iniciar-partida').removeAttr('disabled');
    $('#cartelas').fadeIn();
});

$('#iniciar-partida').click(function () {
    $('#sortear').removeAttr('disabled');
})

var sorteados = [];
var numAcertos = [0, 0, 0, 0];
var vencedores = [];

$("#sortear").click(function () {
    do {
        var numSorteio = Math.floor(Math.random() * 75) + 1;
    } while (sorteados.indexOf(numSorteio) != -1);

    sorteados.push(numSorteio);

    $('#sorteioPassado3').text(
        $("#sorteioPassado2").text()
    );

    $('#sorteioPassado2').text(
        $("#sorteioPassado1").text()
    );

    $('#sorteioPassado1').text(
        $("#sorteioAtual").text()
    );

    $('#sorteioAtual').text(numSorteio);

    for (var i = 0; i < 4; i++) {
        for (var x = 1; x < 6; x++) {
            for (var y = 0; y < 5; y++) {
                if (parseInt($("table:eq(" + i + ") tr:eq(" + x + ") td:eq(" + y + ")").text()) == numSorteio) {
                    $("table:eq(" + i + ") tr:eq(" + x + ") td:eq(" + y + ")").css('background-color', 'green');
                    numAcertos[i]++;
                };
            }
        }
    }

    if (verificaVencedor()) {
        if (vencedores.length === 1) {
            Swal.fire(
                'BINGO!',
                'A cartela vencedora foi: ' + vencedores + '. ',
                'success'
            ).then((result) => {
                if (result.value) {
                    $("#cartelas").hide();
                }
              })
        } else {
            Swal.fire(
                'BINGO!',
                'As cartelas vencedoras foram: ' + vencedores + '. ',
                'success'
            ).then((result) => {
                if (result.value) {
                    $("#cartelas").hide();
                }
              })
        }
        
    }
});

function verificaVencedor() {

    for (var x = 0; x < 4; x++) {
        if (numAcertos[x] == 25) {
            vencedores.push(x + 1);
            $("table:eq(" + x + ")").css('background-color', 'yellow');
        }
    }

    if (vencedores.length != 0) {
        return true;
    }
    return false;
}