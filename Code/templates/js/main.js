/**
 *
 *  @function
 *  @description:   Anonimous function autoexecutable
 *  @params jQuery $.- An jQuery object instance
 *  @params window window.- A Window object Instance
 *  @author: @_Chucho_
 *
 */
(function ( $, window, document, undefined ) {
    
    var _Cinemex    = window._Cinemex, 
    
    // Use the correct document accordingly with window argument (sandbox)
    document = window.document,
    location = window.location,
    navigator = window.navigator,
    
    // Map over Cinemex in case of overwrite
    _Cinemex    = window.Cinemex;
    
    // Define a local copy of Cinemex
    Cinemex = function() {
        if ( !( this instanceof Cinemex ) ) {
            
            // The Cinemex object is actually just the init constructor 'enhanced'
            return new Cinemex.fn.init();
        }
        return Cinemex.fn.init();
    };
    
    Cinemex.overlay;
    
    //  Object prototyping
    Cinemex.fn = Cinemex.prototype = {
        /**
         *
         *  @function:  !constructor
         *  @description:   Constructor method
         *  @author: @_Chucho_
         *
         */
        //  Método constructor
        constructor:    Cinemex, 
        /**
         *
         *  @function:  !init
         *  @description:   Inicializer method
         *  @author: @_Chucho_
         *
         */
        //  !Método inicializador
        init:   function ( ) {}, 
        /**
         *
         *  @function:  !validateContact
         *  @description:   Makes the validation of the contact form
         *  @see:   http://bassistance.de/jquery-plugins/jquery-plugin-validation/ || 
         *          http://docs.jquery.com/Plugins/Validation
                    http://jqueryvalidation.org/documentation/
         *  @author: @_Chucho_
         *
         */
        //  !Validación del formulario de contacto.
        validateForm:    function ( rule, messages, beforeSubmitFunc ) {
            
            var _rule               = ( typeof( rule ) == 'object' ) ? rule : {};
            var _message            = ( typeof( messages ) == 'object' ) ? messages : {};
            var _beforeSubmitFunc   = ( typeof( beforeSubmitFunc ) != 'undefined' && typeof( beforeSubmitFunc ) != 'null' ) ? ( typeof( beforeSubmitFunc ) == 'function' ) ? beforeSubmitFunc : $.noop() : $.noop() ;
            
            var formActive = $( 'form' ).validate( { 
                onfocusout: false,
                onclick: true, 
                onkeyup: false,
                onsubmit: true, 
                focusCleanup: true, 
                focusInvalid: false, 
                errorClass: "error", 
                validClass: "valid", 
                errorElement: "label", 
                ignore: "", 
                /*showErrors: function( errorMap, errorList ) {
                    $('#message').empty().removeClass();
                    $("#message").html('<p>Error al ingresar la información.</p><p>Verifique que sus datos están correctos o que no falte ningún dato.</p><p>Por favor, vuelvalo a intentar.</p>');
                    $('#message').addClass('wrong').show('fast', function(){
                        $('#message').show('fast');
                    });
                    this.defaultShowErrors();
                },*/
                errorPlacement: function(error, element) {
                    error.appendTo( element.parent() );
                },
                //debug:true, 
                rules: _rule,
                messages: _message, 
                ignore: 'textarea', 
                highlight: function( element, errorClass, validClass ) {
                    $( element ).parent().addClass( 'error_wrapper' );
                },
                unhighlight: function( element, errorClass ) {
                    $( element ).parent().removeClass( 'error_wrapper' );
                }, 
                submitHandler: function( form ) {
                    // Form submit
                    $( form ).ajaxSubmit( {
                        //    Before submitting the form
                        beforeSubmit: function showRequestLogin( arr, form, options ) {
                            
                            _beforeSubmitFunc();
                        },
                        //  !Function for handle data from server
                        success: function showResponseLogin( responseText, statusText, xhr, form ) {
                            
                            //console.log(responseText.success);
                            responseText    = $.parseJSON( responseText );
                            
                            if( responseText && ( responseText.success == 'true' || responseText.success == true ) ) {
                                
                                
                            } else {
                                
                            }
                        }, 
                        resetForm: false, 
                        clearForm: false, 
                        //   If something is wrong
                        error: function( jqXHR, textStatus, errorThrown ) {
                            //console.log(textStatus);
                            //console.log(errorThrown);
                        }, 
                        cache: false
                    } );
                }, 
                /*invalidHandler: function(form, validator) {
                    var errors = validator.numberOfInvalids();
                    if (errors) {
                        var message = errors == 1 ? 'You missed 1 field. It has been highlighted' : 'You missed ' + errors + ' fields. They have been highlighted';
                        $("div#summary").html(message);
                        $("div#summary").show();
                    } else {
                        $("div#summary").hide();
                    }
                }*/
            } ); 
        }, 
        /**
         *
         *  @function:  !toggleValue
         *  @description:   Does toggle if the input have a value or if doesn't
         *  @params jQuery selector.- A jQuery Selector 
         *  @params String valueChange.- A String with the value to change or preserve
         *  @author: @_Chucho_
         *
         */
        //  !Revisa si el valor de un input es el original o no y lo preserva o 
        //  respeta el nuevo valor.
        toggleValue:    function ( selector, valueChange ) {
            
            _selector       = ( typeof( selector ) == "undefined" ) ? "*" : selector;
            _selector       = ( typeof( _selector ) == "object" ) ? _selector : $( _selector );
            
            _valueChange  = ( valueChange == "" ) ? 400 : valueChange;
            _valueChange  = ( typeof( _valueChange ) == "string" ) ? parseInt( _valueChange ) : _valueChange;
            _valueChange  = ( typeof( _valueChange ) != "number" ) ? parseInt( _valueChange ) : _valueChange;
            
            var _placeholder;
            
            if ( _selector.attr( 'placeholder' ) != undefined ) {
                
                _placeholder = String ( _selector.attr( 'placeholder' ) ).toLowerCase();
            } else {
                
                _placeholder = String ( _selector.val( ) ).toLowerCase();
            }
            
            if ( ( _placeholder == "" ) || ( _placeholder == _valueChange ) ) {
                
                _selector.css( { 
                    color: '#aaa'
                } );
            }
            
            _selector.on( {
                blur: function ( e ) {
                    
                    _comment = String( $( e.currentTarget ).val() ).toLowerCase();
                    if ( ( _comment == _placeholder ) || ( _comment == "" ) ) {
                        
                        $( e.currentTarget ).val( "Ninguno" ).css( {
                            color: '#aaa'
                        } );
                        return false;
                    }
                },
                focus: function ( e ) {
                    
                    _comment = String( $( e.currentTarget ).val() ).toLowerCase();
                    if ( _comment == _placeholder ) {
                        
                        $( e.currentTarget ).val( '' ).css( { color: '#666' } );
                        return false;
                    }
                }
            } );
        }, 
        /**
         *
         *  @function:  !toggleClass
         *  @description:   Toggle an HTML class
         *  @params jQuery selector.- A jQuery Selector 
         *  @params String className.- A class to toggle to the target
         *  @author: @_Chucho_
         *
         */
        //  !Hace toggle de una clase a un selector específico
        toggleClass: function ( selector, className ) {
            
            _selector       = ( typeof( selector )  == "undefined" ) ? "*" : selector;
            _selector       = ( typeof( _selector ) == "object" )    ? _selector : $( _selector );
            _class          = ( typeof( className ) == "undefined" ) ? ".active" : className;
            _class          = ( typeof( _class )    == "string" )    ? _class : String( _class );
            
            if ( selector.exists() ) {
                
                _selector.toggleClass( _class );
            }
        }, 
        validateNotRepeated: function ( element, msg ) {
            var elementValidate   = $( '#' + element ),
                elementVal        = elementValidate.val(),
                anotherElements   = $( 'input[type=text]' ).not( elementValidate );
            
            if ( elementVal == '' ) {
                
                elementValidate.parents().children( '.error' ).remove( ); 
                
                elementValidate.parent().append( '<label class="error">Este campo es requerido.</label>' );
                return false;
            } else {
                
                for( var i = 0; i < anotherElements.length; i++ ) {
                    
                    if ( anotherElements.eq( i ).val( ) == elementVal ) {
                        
                        elementValidate.parents().children( '.error' ).remove( ); 
                        elementValidate.parent().append( '<label class="error">' + msg + '</label>' );
                        return false;
                    } else {
                        
                        elementValidate.parent().children( '.error' ).remove( );
                    }
                }
            }
            return true;
        }
    };
    
    // Give the init function the Cinemex prototype for later instantiation
    Cinemex.fn.init.prototype = Cinemex.fn;
    
    Cinemex = Cinemex.fn;
    
    // Expose Cinemex to the global object
    
    window.Cinemex  = Cinemex;
    
    $( document ).on( 'ready', function ( e ) {
        
        // Validación de los formularios
        if ( $( '#favorites' ).exists() ) {
            
            var rules   = { 
                    cinepolis_option: {
                        required: true, 
                        range: [1, 5],
                        maxlength: 1,
                        number: true,
                        digits:true
                    }, 
                    cinemark_option: {
                        required: true,
                        range: [1, 5],
                        maxlength: 1,
                        number: true,
                        digits:true
                    }, 
                    cinemex_option: {
                        required: true,
                        range: [1, 5],
                        maxlength: 1,
                        number: true,
                        digits:true
                    }, 
                    cineteca_option: {
                        required: true,
                        range: [1, 5],
                        maxlength: 1,
                        number: true,
                        digits:true
                    }, 
                    el_sol_option: {
                        required: true,
                        range: [1, 5],
                        maxlength: 1,
                        number: true,
                        digits:true
                    }
                };
            var messages    = {
                    required: "Por favor, selecciona una opción", 
                    minlength: "Por favor, haga su respuesta más amplia.", 
                    maxlength: "Por favor, acorte su respuesta", 
                    email: "Escriba un email válido",
                    number: "Escriba solo números", 
                    digits: "Escriba solo números", 
                    range: "Por favor, escriba un número del 1 al 5"
                };
            
            var functionForSubmit   = function ( ) {
                
                //  Valida la información de los campos
                var validarCinepolis    = Cinemex.validateNotRepeated( 'cinepolis_option', 'No escriba números repetidos' );
                var validarCinemark     = Cinemex.validateNotRepeated( 'cinemark_option', 'No escriba números repetidos' );
                var validarCinemex      = Cinemex.validateNotRepeated( 'cinemex_option', 'No escriba números repetidos' );
                var validarCineteca     = Cinemex.validateNotRepeated( 'cineteca_option', 'No escriba números repetidos' );
                var validarElSol        = Cinemex.validateNotRepeated( 'el_sol_option', 'No escriba números repetidos' );
                
                if ( validarCinepolis && validarCinemark && validarCinemex && validarCineteca && validarElSol ) {
                    
                    $('.error_indicator').remove();
                    if ( $('textarea' ).val() == "" ) {
                        
                        $('textarea' ).val( 'Ninguno' );
                    }
                } else {
                    
                    return false;
                }
            };
            
            Cinemex.validateForm( rules, messages, functionForSubmit );
        }
        
        // Validación de los formularios
        if ( $( '#proposal' ).exists() ) {
            
            var rules   = { 
                    valor_a: {
                        required: true
                    }, 
                    valor_b: {
                        required: true
                    }, 
                    valor_c: {
                        required: true
                    }, 
                    valor_d: {
                        required: true
                    }, 
                    valor_e: {
                        required: true
                    }, 
                    valor_f: {
                        required: true
                    }
                };
            var messages    = {
                    required: "Por favor, selecciona una opción", 
                    minlength: "Por favor, haga su respuesta más amplia.", 
                    maxlength: "Por favor, acorte su respuesta", 
                    email: "Escriba un email válido",
                    number: "Escriba solo números", 
                    digits: "Escriba solo números", 
                    range: "Por favor, escriba un número del 1 al 5"
                };
            
            Cinemex.validateForm( rules, messages );
        }        
        
        //  Handler de contenido de textarea
        if ( $( 'textarea' ).exists() ) {
            
            $( 'textarea' ).val( 'Ninguno' );
            Cinemex.toggleValue( 'textarea', "Ninguno" );
        }
    } );
    
})( jQuery, window, document );