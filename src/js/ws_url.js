/**
 * get URL for the web service of the requested type
 * @param request type of the resource requested
 * @returns URL for the requested type
 */
function getWsUrl(request,conf_code,post_reg_code) {
    // var ws_base = "http://glycomics.ccrc.uga.edu/meetings/api/";
	var ws_base = "http://localhost:8080/";
    
	var ws_base_abstract = ws_base+"abstract";
    var ws_base_registration = ws_base +"registration";
    
    switch (request.toLowerCase()) {
	    case "info":
	        return ws_base_registration + "/info/" + conf_code;
	        break;
	    case "post_reg":
	    	return ws_base_registration + "/info/" + conf_code + "/" + post_reg_code;
	    	break;
	    case "register":
	        return ws_base_registration + "/register";
			break;
		case "abstract_info":
			return ws_base_abstract + "/info/" + conf_code;
			break;
		case "abstract_info_post_reg":
			return ws_base_abstract + "/info/" + conf_code + "/" + post_reg_code;;
			break;
		case "abstract_submit":
			return ws_base_abstract + "/add";
    }
}
