//IGTI - Custom javascript
//HTML escrito a partir deste JS, como "appends" de texto em elementos, devem conter códigos para letras acentuadas. Motivo: formatação UTF-8 inclusas após o carregamento da página, não é processada pelo Canvas. Problema desconhecido.

async function pesquisaNPS() {

    function postVotedNps(id, email, note) {
        //console.log(`Enviando id: ${id} email: ${email} e nota: ${note}`)

        var xhr = new XMLHttpRequest();
        var url = "https://nps.igti.com.br/igti/nps/";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                localStorage.setItem(`@IGTI:CanvasNPS:${id}`, JSON.stringify({
                    voted: true,
                }));
                //        console.log(`POST e alteração no storage realizado! @IGTI:CanvasNPS:${id} para TRUE`);
            }
        };
        var data = JSON.stringify({
            id,
            email,
            note,
        });

        xhr.send(data);
    }

    const id = ENV.current_user_id;
    const email = ENV.USER_EMAIL;

    if (id && email) {
        //console.log(`Variaveis id e email encontradas: ${id} - ${email}`)
        const userVotedStorageCache = JSON.parse(localStorage.getItem(`@IGTI:CanvasNPS:${id}`));

        if (!userVotedStorageCache) {
            //console.log(`Pesquisa no cache por @IGTI:CanvasNPS:${id}: não existe`)
            const { voted } = await $.get(`https://nps.igti.com.br/igti/nps/${id}`);

            if (voted) {
                localStorage.setItem(`@IGTI:CanvasNPS:${id}`, JSON.stringify({
                    voted: true,
                }));
                //console.log(`Realizado busca de votação no banco de dados: ${voted}`)
                //console.log(`Setado valor no storage: @IGTI:CanvasNPS:${id} como ${voted}`)
                return;
            }

            exibirModalDePesquisa();
        } else if (!userVotedStorageCache.voted) {
            postVotedNps(id, email, userVotedStorageCache.note);
            //console.log('User no storage com valor de FALSE, reenviando requisição POST');
        } else {
            return 'Aluno já votou e localizado no storage';
        }
    }

    async function exibirModalDePesquisa() {
        console.log('Exibindo modal de pesquisa')
        $('body').append('<div id="fundoEscuro"></div><div id="npsContainer" class="animated flipInX"> <p> Em uma escala de 0 a 10, quanto você recomendaria o IGTI a um amigo ou colega? </p> <div id=npsNotesList> <span></span> <div> <button class="submitNoteNPS">0</button> <button class="submitNoteNPS">1</button> <button class="submitNoteNPS">2</button> <button class="submitNoteNPS">3</button> <button class="submitNoteNPS">4</button> <button class="submitNoteNPS">5</button> <button class="submitNoteNPS">6</button> <button class="submitNoteNPS">7</button> <button class="submitNoteNPS">8</button> <button class="submitNoteNPS">9</button> <button class="submitNoteNPS">10</button> </div> <span></span> </div></div><style> @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;1,300&display=swap"); div#fundoEscuro { background-color: rgba(0, 0, 0, 0.3); width: 100%; position: fixed; height: 100vh; z-index: 900; top: 0; right: 0; left: 0; bottom: 0; display: none; } div#npsContainer { display: none; z-index: 999; position: fixed; top: 0; width: 100%; background-color: white; padding-bottom: 20px; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.13); } div#npsContainer p { text-align: center; font-family: "Roboto", sans-serif; font-weight: 200; color: rgba(0, 0, 0, 0.8); font-size: 18px; margin-bottom: 10px; } div#npsNotesList { display: flex; justify-content: center; align-items: center; font-family: "Roboto", sans-serif; font-style: italic; color: rgba(0, 0, 0, 0.6); } div#npsNotesList div { margin: 0 10px; } div#npsNotesList div button { width: 50px; height: 50px; border-radius: 50%; outline: none; border: 0.5px solid rgba(0, 0, 0, 0.2); color: rgba(0, 0, 0, 0.5); font-size: 15px; background: transparent; cursor: pointer; transition: 0.2s; } div#npsNotesList div button:hover { color: white; font-weight: 800; background: rgb(0, 175, 162); border: 0.5px solid transparent; }</style>');
        $('#fundoEscuro').fadeIn('300');
        $('#npsContainer').removeClass('flipOutX').show();


        $('#fundoEscuro').click(() => {
            $('#npsContainer').addClass('flipOutX');
            $('#fundoEscuro').fadeOut('300');
        });

        $('.submitNoteNPS').on('click', (e) => {
            const note = e.target.textContent;

            localStorage.setItem(`@IGTI:CanvasNPS:${id}`, JSON.stringify({
                voted: false,
                note,
            }));

            postVotedNps(id, email, note);

            $('#npsContainer').html('<p style="margin-top: 30px">Obrigado pelo seu feedback!</p>');

            setTimeout(() => {
                $('#npsContainer').addClass('flipOutX');
                $('#fundoEscuro').fadeOut('300');
            }, 1000);
        });
    }
}

$(document).ready(function () {

    $('#application').fadeIn(200);

    //CURSOS
    const bootcamps = ['2944', '2945', '2946', '2939', '2940', '2941', '2942', '2934', '2935', '2936', '2937', '2932', '2933', '2938'];
    const parceiros = ['2950', '2977', '2978'];

    //Variáveis globais
    const isLoginScreen = window.location.href.indexOf('/login/canvas');
    const isCourse = window.location.href.indexOf('/courses/');
    const url = window.location.href;

    //Chamadas

    actions();

    if (isLoginScreen == -1) {
        renderizarModais();
    } else {
        customizarLoginMobile();
    }

    if (url == 'https://online.igti.com.br/?login_success=1' || url == 'https://online.igti.com.br/') {
        impossibilitarAlunoDeRejeitarDisciplina();
    }

    if (url.indexOf('change_password') > 0) {
        aplicarDesignTelaRecuperacaoDeSenha();
    }

    if (isCourse > 0) {
        modificarElementosCurso();
        addBarraProgresso();
    }

    //Funções
    if (ENV.current_user.display_name) {
        if (!ENV.USER_EMAIL && localStorage.getItem(`@MailIGTIUser${ENV.current_user.display_name}`)) {
            ENV.USER_EMAIL = localStorage.getItem(`@MailIGTIUser${ENV.current_user.display_name}`);
        } else if (ENV.USER_EMAIL) {
            localStorage.setItem(`@MailIGTIUser${ENV.current_user.display_name}`, ENV.USER_EMAIL);
        }

        //Removendo click do link na aba ajuda
        $('#global_nav_help_link').click(() => {
            setTimeout(() => {
                const item = findItem('a', 'Nova central de ajuda.');
                if (item) {
                    item.href = '#';
                    item.target = '';
                }
            }, 1000);
        });

        if (ENV.USER_EMAIL) {
            //carregando help center intercom
            console.log(`Carregando Widget de ajuda com email: ${ENV.USER_EMAIL}`);
            window.intercomSettings = {
                app_id: `zq3uaf8y`, //ID
                name: `${ENV.current_user.display_name}`, // Full name
                email: `${ENV.USER_EMAIL}`, // Email address
                custom_launcher_selector: '#global_nav_help_link'
            };

            // We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/zq3uaf8y'
            (function () { var w = window; var ic = w.Intercom; if (typeof ic === "function") { ic('reattach_activator'); ic('update', w.intercomSettings); } else { var d = document; var i = function () { i.c(arguments); }; i.q = []; i.c = function (args) { i.q.push(args); }; w.Intercom = i; var l = function () { var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://widget.intercom.io/widget/zq3uaf8y'; var x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); }; if (w.attachEvent) { w.attachEvent('onload', l); } else { w.addEventListener('load', l, false); } } })();
        }
    }

    function actions() {
        //Carregando biblioteca de animação Animate.css
        $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css'));
        //removendo link no formulário de login "LMS de Fonte Aberta"
        $('.ic-Login-footer__links').hide();
        $('.ic-Login-header__links').hide()

        if(url.indexOf('grades') > 0) $('#only_consider_graded_assignments').click()
    }


    function renderizarModais() {
        // Modal de aviso
        var modal_estilos = 'display: block; max-width: 900px; padding: 25px; background: #fff; border-radius: 5px; -webkit-box-shadow: 0px 6px 14px -2px rgba(0,0,0,0.75); -moz-box-shadow: 0px 6px 14px -2px rgba(0,0,0,0.75); box-shadow: 0px 6px 14px -2px rgba(0,0,0,0.75); position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); z-index: 99999999; overflow: visible;';
        var fundo_modal_estilos = 'top: 0; right: 0; bottom: 0; left: 0; position: fixed; background-color: rgba(0, 0, 0, 0.6); z-index: 99999999; display: none;';

        //Ao passar o mes para dataExpiracao, subtrair 1. 

        const modals = []

        if (modals.length > 0) {
            var UmModalPorChamada = false;

            modals.forEach(modal => {
                if (new Date() < modal.dataExpiracao && UmModalPorChamada == false) {
                    if (modal.chamada()) UmModalPorChamada = true;
                }
            })
        }

        $(".fundo_modal, .close").click(function () { $(".fundo_modal").fadeOut(100); });
        $(".modalStop").click(function (e) { e.stopPropagation(); });
    }

    function getTipoDeCurso() {
        //Caso o usuário esteja na página de inicio.  
        var tipo;

        parceiros && parceiros.forEach(curso => {
            if (url.indexOf(curso) > 0) {
                tipo = 'parceiros';
            } else if (ENV.STUDENT_PLANNER_COURSES) {


                ENV.STUDENT_PLANNER_COURSES.forEach(cursoEnv => {
                    if (cursoEnv.id == curso) tipo = 'parceiros'
                });
            }
        });

        if (!tipo) {
            var title = document.getElementsByTagName('title')[0];

            if (ENV.STUDENT_PLANNER_COURSES) {
                ENV.STUDENT_PLANNER_COURSES.forEach(cursoEnv => {
                    if (cursoEnv.originalName.indexOf('Bootcamp') >= 0 || cursoEnv.originalName.indexOf('bootcamp') >= 0) tipo = 'bootcamp'
                })
            }

            if (title && title.innerText.indexOf('Bootcamp') >= 0 || title.innerText.indexOf('bootcamp') >= 0) {
                tipo = 'bootcamp'
            }
        }

        if (!tipo) tipo = 'pos';

        return tipo; //parceiros | bootcamp | pos
    }

    function findItem(type, text) {
        element = Array.from(document.querySelectorAll(type)).find(el => el.textContent === text);
        return element;
    }

    function impossibilitarAlunoDeRejeitarDisciplina() {
        var btn = $('button[name="reject"]');
        btn.on('click', function () {
            var texto_aviso_rejeitar = '<div id="alerta_div_rejeitar" class="alert alert-danger animated pulse" style="padding: 15px 25px; margin-bottom: 50px;"><strong>Voc&ecirc; j&aacute; est&aacute; matriculado nesta disciplina!</strong><br>Para informa&ccedil;&otilde;es sobre trancamento, utilize o bot&atilde;o "Ajuda" abaixo.</div>';
            btn.attr("disabled", true);
            $("#content").prepend(texto_aviso_rejeitar);
        });
    }

    function modificarElementosCurso() {
        var renderizandoModificacoes = setInterval(() => {
            //Mudando icon de check
            $(".module-item-status-icon [title='Completo']").addClass("icon-Solid icon-publish");
            $('.requirements_message').hide();
        }, 50);

        setTimeout(() => {
            clearInterval(renderizandoModificacoes)
        }, 4000)
    }

    function addBarraProgresso() {
        setTimeout(() => {
            var tituloBarraDeProgresso = 'Progresso da disciplina';
            var quant_itens_unchecked = $(".icon-mark-as-read");
            var quant_itens_checked = $(".module-item-status-icon [title='Completo']");
            var quant_itens_unchecked = quant_itens_unchecked.length;
            var quant_itens_checked = quant_itens_checked.length;
            var quant_itens_curso = quant_itens_checked + quant_itens_unchecked;
            var percentual_concluido = parseInt((100 * quant_itens_checked) / quant_itens_curso);

            if (getTipoDeCurso() == 'bootcamp') {
                tituloBarraDeProgresso = tituloBarraDeProgresso.replace('da disciplina', 'do bootcamp');
            }

            if (percentual_concluido > 0) {
                console.log("Barra de progresso carregada");
                $("#right-side-wrapper").prepend(`<div class="progress_bar animated fadeInDown"><div style="padding: 0px 5px;">${tituloBarraDeProgresso} <span style="float: right;">${percentual_concluido}%<span></div><div class="pro-bar" style="margin-top: 7px; border-radius: 50px;"><div class="pro-bg"></div><div class="progress-bar-inner" style="border-radius: 50px; width: ${percentual_concluido}%; background: #00afa2;"></div></div></div>`);
            }
        }, 2000);
    }

    //  EXPOSIÇÃO DE ITENS
    // if (url.indexOf('/courses/2948') > 0) {
    //     $('#context_module_item_193043 div.ig-row').html('<img src="https://igti.instructure.com/courses/2948/files/194266/preview" alt="PSBtc.png" data-api-endpoint="https://igti.instructure.com/api/v1/courses/2948/files/194266" data-api-returntype="File">')
    // }

    // if (url.indexOf('/courses/3003')) {
    //     $('#context_module_item_203440 div.ig-row').html('<div style="width: 100%; margin-left: auto; margin-right: auto; overflow: hidden;"><h1 align="center"><iframe src="https://player.vimeo.com/video/440372134?title=0&byline=0&portrait=0" position: "relative" overflow:"hidden" width="100%" height="400px" frameborder="0" allow="autoplay; fullscreen" allowfullscreen=""></iframe></h1></div>')
    // }

    function aplicarDesignTelaRecuperacaoDeSenha() {
        $('#content').css({
            "display": "flex",
            "justify-content": "center"
        })

        $('#modal-box').css('width', 'auto');

        $('#modal-box>div').css({
            'padding': '40px',
            'background': '#f2f2f2',
            'border-radius': '5px'
        })

        $('body').css('background-image', 'url("https://lh3.googleusercontent.com/fife/ABSRlIqRQpgzT4fsSRLsrbHDQu-VMv6KVnGY-nZjMlFplnlsJl_gKyWCnySL7EkR6BCU_YcFIUYJQaDkqTR0AtOQKCqkZ2kV4o7ep7PMc9vMj6zKjf39FPyRlEeIjBLYKxOD15TWr6eWeor-QYosscPLgG4V2QG_K8E-dnRKSU4B-rcqU_A0_hgDExSDIdCL7sJUge2JI0Hdl-5J1AkqfZUPGI76p3HcyZdNWWj1UZemFK8kH-7uEU7JVCPawUkZLc4TbFQcR_CfnyZyDucskRsuQ_aT7OZR4VHZDImm6aCc2TOnh2hnOfK5b3kMtTfexh8D2k8rGLXUe_piMhN9JYXzM3iP1DNbZuSxHNf_OluHGbCVmaMpGER9OHQkE8fyXIHWWwmwoa41fBt0RidIQ0W98e5LSyr5Hb9uZ3uDTbeqX6hWW2CuH0pwPxG3C41KVCij5DJIIjsrPVhAuTXyzYkdi49N5fuJuN46XpLD1gOM417L0rTXHadr-eKJmF84IIQz04-4VqTNIoxwIRFvn8fNBmNBYGaB-6GbtzKM6ARkinstVAHME3tV4A7Z0Oqfil2JANKEOedlr8LpNZ-6ZFIhOjCWerV7HDwhX7EaBVRSv5sRTxNecjf614dSrGr4oxeEGUzpcTm2x1yytqmIZIWZXVrFlNNLe6HOskZyIQ183pgfAnNpuRAauuk_F8c3fhZc4jlv7BZRssMUg7VvzNZc6nIGq9tX8oOzAtw=w1920-h853-ft")')
        $('body').css('background-size', 'cover');
        $('h2').css({
            "margin": '0px',
            "width": '350px',
            "font-size": '16px'
        })
        $('tr td div').css({
            'font-size': '16px',
            'margin-bottom': '30px'
        })
        $('#modal-box>div').prepend('<div style="width: 100%; display: flex; align-items: center; justify-content: center; margin-bottom: 30px"><img width="160" src="https://online.igti.com.br/accounts/1/files/252/download?verifier=ZfZYgbiiHV0rvvo987QT8phjAVYVNcxuqT0cBe1p" / ></div>')
    }

    function customizarLoginMobile() {
        if ($(window).width() < 600) {
            $('.mobileLogin-Header').remove()

            $('#f1_card').prepend('<img src="https://instructure-uploads.s3.amazonaws.com/account_109160000000000001/attachments/832/logo%20igti%20white.png" width="200px">')
            $('#f1_container').css({
                "background-image": "none",
                "width": "100%",
                "display": "flex",
                "align-items": "center",
                "justify-content": "center",
                "flex-direction": "column",
                "margin": "0",
                "padding": "0",
            })
            $('#f1_card').css({
                "width": "100%",
                "display": "flex",
                "align-items": "center",
                "flex-direction": "column",
            })
            $('img').css({
                "margin": "20px 0"
            })

            $('#login_form').css('width', '80%');
        }
    }

    //IMPLEMENTAÇÕES ANTIGAS

    //Retira o overlay de cor dos boxs de cursos no dashboard:
    var cursos = document.getElementsByClassName('ic-DashboardCard__header_hero');
    for (var i = 0; i < cursos.length; i++) {
        cursos[i].style.opacity = '0'
    }

    //retira a opção de colocar apelidos no cursos se não for administrador
    if ($.inArray("admin", ENV.current_user_roles) == -1) {
        var apelidoUI = $('.ColorPicker__Container > .ic-Form-control')
        //retira opção de mudar a cor do curso.
        $(".ic-DashboardCard__header-button").remove();
        //var apelidoUI = document.getElementsByClassName('.ColorPicker__Container.ic-Form-control');
        for (var i = 0; i < apelidoUI.length; i++) {
            apelidoUI[i].style.display = 'none'
            //$(".ic-DashboardCard__header-button").hide();
        }
    }
    /*
    //esconde o link de download do arquivo
    if(window.location.pathname.indexOf('/files/') >= 0){
    $("#content div:first").remove();
    //$("h2").hide();
    }*/

    //se estiver na página inicial do grupo:,


    if (window.location.pathname.indexOf('/quizzes/') >= 0) {
        $('a#preview_quiz_button').click(function () {
            setTimeout(setQuizzesWarnings, 100);
        });
    }

    function setQuizzesWarnings() {
        $('#ui-id-1').text('Atenção!');
        $('#js-sequential-warning-dialogue').text('Assim que enviar sua resposta, não será possível mudá-la posteriormente. Você não conseguirá ver a questão anterior.');
        $('.ui-dialog .btn:contains("Begin")').text('Iniciar!');
    }

    //CLick no preview do arquivo
    if (window.location.pathname.indexOf('/wiki') >= 0) {
        setTimeout(loadPreviewer, 130);
    }
    if (window.location.pathname.indexOf('/pages') >= 0) {
        setTimeout(loadPreviewer, 130);
    }

    function loadPreviewer() {
        $('a.file_preview_link').trigger('click');
    }

    //traduzir True or false
    if (window.location.pathname.indexOf('/quizzes') >= 0) {
        var searchTtrue = 'True';
        var searchFalse = 'False';

        $('.answer_label label').filter(function () {
            return $(this).text() === searchTtrue;
        }).text('Verdadeiro');

        $('.answer_label label').filter(function () {
            return $(this).text() === searchFalse;
        }).text('Falso');

        if ($(".lock_explanation").length) {
            $('.lock_explanation').html($('.lock_explanation').html().replace('travado', 'indisponível'));
        }
    }


    $('.ui-tabs-anchor:contains("Perguntas")').click(function () {
        setTimeout(translateQuizesTexts, 500);
    });

    function translateQuizesTexts() {
        var searchTtrue = 'True';
        var searchFalse = 'False';

        console.log('teste!!!');
        $('.answer_text').filter(function () {
            return $(this).text() === searchTtrue;
        }).text('Verdadeiro');

        $('.answer_text').filter(function () {
            return $(this).text() === searchFalse;
        }).text('Falso');

        if ($(".question_name").length) {
            $(".question_name").each(function (index) {
                $(this).html($('this').html().replace('Question', 'Pergunta'));
            });
        }
    }

    //tradução to-do-list

    if ($(".todo-details__title").length) {
        $(".todo-details__title").each(function (index) {
            $(this).html($(this).html().replace('Pegar', 'Fazer'));
        });
    }



    //traduzir Imported assignments
    if (window.location.pathname.indexOf('/assignments') >= 0) {
        //$('.element_toggler:contains("Imported Assignments")').text('Tarefas Importadas');
    }
    if (window.location.pathname.indexOf('/grades') >= 0) {
        //$('.student_assignment .title:contains("Imported Assignments")').text("Tarefas Importadas");
    }

    //TELA DE LOGIN
    if (window.location.pathname.indexOf('/login/canvas') >= 0) {
        //esconde log da instructure
        $('.ic-Login-footer__logo-link').hide();
        //muda links do Twitter e Facebook
        $("a[href='http://twitter.com/instructure']").attr('href', 'https://twitter.com/InstitutoGTI'); //Twitter
        $("a[href='http://facebook.com/instructure']").attr('href', 'https://www.facebook.com/institutogti'); //facebook
        //mudar texto de esqueceu a senha
        $('#login_forgot_password').text('Cadastrar ou recuperar senha');

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $('body').css("background-color", "#00afa2");
            $('body').css("background-image", "none");
        }
    }

    $('html').css("background-color", "#fff");
    $('html').css("background-image", "none");

    //Mudanças no menu Global = Painel e Disciplinas
    $('#global_nav_dashboard_link .menu-item__text').text('Painel');
    $('#global_nav_courses_link .menu-item__text').text('Disciplinas');
    $('.ic-Dashboard-header__title').text('Painel')

    $('.header-bar:contains("Todos os Cursos")').html('<h2>Todas as Disciplinas</h2>');
    $('thead .course-list-course-title-column:contains("Curso")').text('Disciplinas');

    $('#global_nav_courses_link').click(function () {
        setTimeout(setCoursesToDisciplinas, 100);
    });

    function setCoursesToDisciplinas() {
        $('.ic-NavMenu__headline').text('Disciplinas');
        $('.ic-NavMenu-list-item__link:contains("Todos os Cursos")').text('Todas as Disciplinas');
        $('.ic-NavMenu__secondary-content').text('Bem-vindo as suas Disciplinas! Para personalizar a lista de disciplinas, clique no link "Todas as Disciplinas" e coloque uma estrela nas disciplinas para serem exibidas.');
    }

    //esconde rodapé da Instructure
    $(".ic-app-footer").hide();
    $("#footer").hide();

    //grupos dos cursos no hangout
    if (window.location.pathname.indexOf('/conferences') >= 0) {

        $(window).load(function () {
            $('img').each(function () {
                if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                    // image was broken, replace with your new image
                    this.src = 'https://instructure-uploads.s3.amazonaws.com/account_96230000000000001/attachments/9/panda-cycle-loader.gif?AWSAccessKeyId=AKIAJFNFXH2V2O7RPCAA&Expires=1947934279&Signature=CcaVDMUa5by1evBxpB9pFQBOoig%3D&response-cache-control=Cache-Control%3Amax-age%3D473364000.0%2C%20public&response-expires=473364000.0';
                }
            });
        });

        if ($.inArray('admin', ENV['current_user_roles']) > -1 || $.inArray('teacher', ENV['current_user_roles']) > -1) {

            //this might go somewhere else... inside the .jsonGroups.lenght if
            var $hangoutContentDiv = $("<div>", {
                id: "hangoutDivs",
                "class": "item-group-container item-box"
            });
            $('#content-wrapper').append('<div id="hangoutMain" class="ic-Layout-contentMain"></div>');
            $("#hangoutMain").append($hangoutContentDiv);

            var currentCourseID;
            var currentCourseName;
            var groupsIDs;
            var inviteList = "";
            var mailList = "";
            var currentMailList = "";

            document.addEventListener('copy', function (e) {
                e.preventDefault();
                e.clipboardData.setData("text/plain", currentMailList);
            })

            //pega o ID do curso atual com base na URL
            sTemp = window.location.pathname.match(/\/courses\/(\d+)/);
            currentCourseID = sTemp[1];
            //console.log("ID do Curso: " + currentCourseID);

            //opcional: busca via API o nome do Curso atual
            $.getJSON('/api/v1/courses/' + currentCourseID, function (jsonCourse) {
                currentCourseName = jsonCourse.name
                //console.log("Nome do Curso: " + currentCourseName);
            });

            //busca todos os grupos do curso atual via API
            $.getJSON("/api/v1/courses/" + currentCourseID + "/groups?per_page=9999", function (jsonGroups) {
                //se existirem grupos:
                if (jsonGroups.length != 0) {
                    //lista cada item do JSON retornado pelo call a API
                    $('#hangoutDivs').append('<div class="item-group-condensed"><div class="ig-header"><h2 class="ig-header-title"><a class="element_toggler accessible-toggler" href="#" aria-label="Conferências Hangout">Conferências Hangout</a></h2>');
                    $.each(jsonGroups, function (index, value) {
                        var currentGroup = index;
                        //busca os usuários de cada grupos
                        $.getJSON('/api/v1/groups/' + value.id + '/users?include[]=avatar_url&per_page=9999', function (json) {

                            //add o box principal da listagem de grupos
                            //adiciona o nome do grupo
                            $('#hangoutDivs').append('</div><div class="item-group-condensed"><div class="item-group-expandable"><div style="padding:10px" id="hangout-conference-list' + currentGroup + '"></div></div></div>');
                            $('#hangout-conference-list' + currentGroup + '').append('<div style="font-size:20px;" class="ig-header-title"><b>Grupo: ' + value.name + '</b></br></br></div>')
                            //console.log("GRUPO: " + value.name);
                            $.each(json, function (index, value) {

                                //adiciona os usuários
                                $currentUserID = value.id
                                $currentUserAvatarURL = value.avatar_url
                                $currentUserName = value.name
                                $currentUserEmail = value.login_id
                                //$currentUserAvatar = '<img src="' + $currentUserAvatarURL + '" width="64px" height="64px" onerror="imgError(this);">'
                                //$currentUserAvatar = '<div style="width:80px; height:80px; background-image: url(' + $currentUserAvatarURL + ');"></div>'
                                $userInfoCard = '<div style="align:middle; border-radius: 3px; box-shadow: 0px 0px 10px #ccc; margin: 5px; padding: 5px;"><div class="grid-row"><div class="col-xs-12 col-lg-6"><div class="ic-image-text-combo"><div class="ic-avatar"><img src="' + $currentUserAvatarURL + '" alt="' + $currentUserName + '" /></div><div class="ic-image-text-combo__text"><a href="/users/' + $currentUserID + '"><b>' + $currentUserName + '</b></a></br><i class="icon-email"></i> ' + $currentUserEmail + '</div></div></div></div>'
                                //$userInfoCard='<div style="align:middle; border-radius: 3px; box-shadow: 0px 0px 10px #ccc; margin: 5px; padding: 5px;">'+$currentUserAvatar+'<a href="users/'+$currentUserID+'"> '+$currentUserName+' </a></td><td>    '+$currentUserEmail+'</div>'

                                //$('#userInfoTable' + currentGroup + '').append($userInfoCard);

                                $('#hangout-conference-list' + currentGroup + '').append($userInfoCard);
                                //$('#hangout-conference-list' + currentGroup + '').append('<ul>' + $currentUserAvatar + value.name + ' - ' + value.login_id + '</ul>');
                                if (index != json.length - 1) {
                                    mailList += value.login_id + ', ';
                                    inviteList += '{ id : \'' + value.login_id + '\', invite_type : \'EMAIL\' },';
                                } else {
                                    //quando for o último iten do array
                                    inviteList += '{ id : \'' + value.login_id + '\', invite_type : \'EMAIL\' }';
                                    mailList += value.login_id;

                                    function copyToClipboard(element) {
                                        alert(element);
                                        var $temp = $("<input>");
                                        $("body").append($temp);
                                        $temp.val(element).select();
                                        document.execCommand("copy");
                                        $temp.remove();
                                    };

                                    //console.log("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_");
                                    //console.log(inviteList)
                                    //$('#hangout-conference-list' + currentGroup + '').append('<p><g:hangout render="createhangout" invites="[' + inviteList + ']"></g:hangout></p>');
                                    $('#hangout-conference-list' + currentGroup + '').append('<button class="btn" id="btn_copyMailList_' + currentGroup + '"><i class="icon-email"></i>Copiar Email dos Participantes</button>');
                                    $('#hangout-conference-list' + currentGroup + '').append('<div id="maiiList' + currentGroup + '"></div>');

                                    //copia a lista de emails do grupo para a área de transferência
                                    $('#maiiList' + currentGroup + '').hide();
                                    $('#maiiList' + currentGroup + '').text(mailList);
                                    $('#btn_copyMailList_' + currentGroup + '').click(function () {
                                        var $temp = $("<input>");
                                        $("body").append($temp);
                                        currentMailList = $('#maiiList' + currentGroup + '').text();
                                        //console.log($('#maiiList' + currentGroup + '').html());
                                        $temp.val($('#maiiList' + currentGroup + '').text()).select();
                                        document.execCommand("copy");
                                        $temp.remove();
                                        //copyToClipboard(mailList);
                                        //alert(currentMailList);
                                    });
                                    inviteList = '';
                                    //console.log('Quantidade de usuários no Grupo:' +json.length);
                                    mailList = "";
                                }
                            });
                        });
                    });

                    //var hangoutJS = document.createElement("script");
                    //hangoutJS.type = "text/javascript";
                    //hangoutJS.src = "https://apis.google.com/js/platform.js";
                    //$("head").append(hangoutJS);

                    //se não existirem grupos no curso atual:
                } else {
                    //console.log("no groups for the " + currentCourseName + "course");
                }
            });
        }
    }
});
