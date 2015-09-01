	function alerterro(msg) {
		$().toastmessage('showToast', {
	         text     : msg,
	         sticky   : false,
	         position : 'middle-center',
	         type     : 'error',
	         closeText: '',
	         close    : function () {
	             console.log("toast is closed ...");
	         }
	     });
    }
	 
	function alerterrofixo(msg) {
		$().toastmessage('showToast', {
	         text     : msg,
	         sticky   : true,
	         position : 'middle-center',
	         type     : 'error',
	         closeText: '',
	         close    : function () {
	             console.log("toast is closed ...");
	         }
	     });
    }
	
	
	function alertnotice(msg) {
		$().toastmessage('showToast', {
	         text     : msg,
	         sticky   : false,
	         position : 'middle-center',
	         type     : 'notice',
	         closeText: '',
	         close    : function () {
	             console.log("toast is closed ...");
	         }
	     });
    }
	
	function alertnoticefixo(msg) {
		$().toastmessage('showToast', {
	         text     : msg,
	         sticky   : true,
	         position : 'middle-center',
	         type     : 'notice',
	         closeText: '',
	         close    : function () {
	             console.log("toast is closed ...");
	         }
	     });
    }
	
	function alertwarningfixo(msg) {
		$().toastmessage('showToast', {
	         text     : msg,
	         sticky   : true,
	         position : 'middle-center',
	         type     : 'warning',
	         closeText: '',
	         close    : function () {
	             console.log("toast is closed ...");
	         }
	     });
    }
	
	function alertwarning(msg) {
		$().toastmessage('showToast', {
			text     : msg,
			sticky   : false,
			position : 'middle-center',
			type     : 'warning',
			closeText: '',
			close    : function () {
				console.log("toast is closed ...");
			}
		});
	}	
	