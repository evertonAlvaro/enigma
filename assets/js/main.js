//  create a new charade
function createCharade() {
    // show div
    document.getElementById('charade').style.display = 'block';
    // hide button
    document.getElementById('start').style.display = 'none';
    // delay
    setTimeout(function () {
        // Fetch the API and generate a new charade
        try {
            index = parseInt(document.getElementById('count-correct-answer').innerHTML) - 1;
            //console.log(data);
            console.log(data[index]);
            // answer
            document.getElementById('answer').value = data[index].resposta_correta;
            // show on div
            document.getElementById('charade').textContent = data[index].pergunta;
            // question
            document.getElementById('question').textContent = 'Qual é a resposta certa?';
            // options
            document.getElementById('options').style.display = 'block';
            i = 1;
            data[index].respostas.forEach(resposta => {
                document.getElementById('option-' + i).value = resposta;
                document.getElementById('option-' + i + '-label').innerHTML = resposta;
                i++;
            });
        } catch (e) {
            alert('Ops! houve um erro ao tentar se conectar com o Gemini. Por favor tente novamente!');
            resetCharade();
            console.log(e);
        }
    }, 1500);
}

// Function to show confirm button when at least one radio button is checked
document.querySelectorAll("input[name='option-radio']").forEach((input) => {
    input.addEventListener('change', showConfirmButton);
});

// Function to validate the charade
function validateCharade() {
    document.getElementById('confirm').innerHTML = '<div class="spinner-grow text-light" role="status"><span class="visually-hidden">Loading...</span></div>';
    // delay
    setTimeout(function () {
        let correct = false;
        let inputSelected;

        // check answer
        document.querySelectorAll("input[name='option-radio']:checked").forEach((input) => {
            inputSelected = input;
            if (input.value == document.getElementById('answer').value) {
                correct = true;
            }
        });

        document.getElementById('confirm').style.display = 'none';
        document.getElementById('confirm').innerText = 'Estou certo disso';

        // check correct
        if (correct) {
            document.getElementById('alert-success').textContent = 'Parabéns! Você acertou!';
            document.getElementById('alert-success').style.display = 'block';
            document.getElementById('next').style.display = 'block';
            // change color success
            document.getElementById(inputSelected.id + '-label').classList.remove('btn-outline-warning');
            document.getElementById(inputSelected.id + '-label').classList.add('btn-outline-success');
        } else {
            document.getElementById('alert-error').textContent = 'Que pena! Você errou.';
            document.getElementById('alert-error').style.display = 'block';
            document.getElementById('reset').style.display = 'block';
            // change color error
            document.getElementById(inputSelected.id + '-label').classList.remove('btn-outline-warning');
            document.getElementById(inputSelected.id + '-label').classList.add('btn-outline-danger');
        }
    }, 2000);
}

// Function to reset the charade
function resetCharade(error) {
    // question
    document.getElementById('question').textContent = 'Posso perguntar?';
    // hide charade
    document.getElementById('charade').style.display = 'none';
    document.getElementById('charade').innerHTML = '<div class="spinner-grow text-light" role="status"><span class="visually-hidden">Loading...</span></div>';
    // hide confirm button
    document.getElementById('confirm').style.display = 'none';
    // hide next button
    document.getElementById('next').style.display = 'none';
    // hide reset button
    document.getElementById('reset').style.display = 'none';
    // hide options
    document.getElementById('options').style.display = 'none';
    // show button
    document.getElementById('start').style.display = 'inline';
    // reset radio buttons
    const inputs = document.getElementsByName('option-radio');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
    }
    // hide alerts
    document.getElementById('alert-success').style.display = 'none';
    document.getElementById('alert-error').style.display = 'none';
    // change color radio button
    changeColorRadioButton();
    // reset count correct answer
    if (error) {
        document.getElementById('count-correct-answer').textContent = 1;
    } else {
        if (parseInt(document.getElementById('count-correct-answer').textContent) > 9) {
            document.getElementById('awardDiv').style.display = 'inline';
            document.getElementById('start').style.display = 'none';
            document.getElementById('question').textContent = 'Parabéns!! Você ganhou e agora é um mestre das charadas.';
        } else {
            document.getElementById('count-correct-answer').textContent = parseInt(document.getElementById('count-correct-answer').textContent) + 1;
        }
    }
}

// When clicked on option button show the confirm button
function showConfirmButton() {
    // show confirm button
    document.getElementById('confirm').style.display = 'block';
    // change question
    document.getElementById('question').textContent = 'Está certo disso?';
    // change color radio button
    changeColorRadioButton();
}

// change color radio button
function changeColorRadioButton() {
    document.querySelectorAll("input[name='option-radio']").forEach((input) => {
        id = input.id;
        // change color
        document.getElementById(id + '-label').classList.remove('btn-outline-success');
        document.getElementById(id + '-label').classList.remove('btn-outline-danger');
        if (input.checked) {
            // if checked then change color warning
            document.getElementById(id + '-label').classList.remove('btn-outline-secondary');
            document.getElementById(id + '-label').classList.add('btn-outline-warning');
        } else {
            // if not checked then change color secondary
            document.getElementById(id + '-label').classList.remove('btn-outline-warning');
            document.getElementById(id + '-label').classList.add('btn-outline-secondary');
        }
    });
}