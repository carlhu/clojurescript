goog.provide('webrepl');
goog.require('cljs.core');
goog.require('cljs.reader');
goog.require('cljs.compiler');
goog.require('cljs.analyzer');
webrepl._STAR_debug_STAR_ = false;
webrepl._STAR_e = null;
webrepl.prompt = (function prompt(){
return [cljs.core.str(cljs.core._STAR_ns_sym_STAR_),cljs.core.str("=> ")].join('');
});
webrepl.read_next_form = (function read_next_form(text){
var _STAR_ns_sym_STAR_3149 = cljs.core._STAR_ns_sym_STAR_;
try{cljs.core._STAR_ns_sym_STAR_ = cljs.core._STAR_ns_sym_STAR_;
return cljs.reader.read_string.call(null,text);
}finally {cljs.core._STAR_ns_sym_STAR_ = _STAR_ns_sym_STAR_3149;
}});
webrepl.evaluate_code = (function evaluate_code(text){
try{var env = cljs.core.assoc.call(null,cljs.analyzer.empty_env.call(null),"\uFDD0'context","\uFDD0'expr");
var form = webrepl.read_next_form.call(null,text);
var _ = (cljs.core.truth_(webrepl._STAR_debug_STAR_)?cljs.core.println.call(null,"READ:",cljs.core.pr_str.call(null,form)):null);
var body = cljs.analyzer.analyze.call(null,env,form);
var ___$1 = (cljs.core.truth_(webrepl._STAR_debug_STAR_)?cljs.core.println.call(null,"ANALYZED:",cljs.core.pr_str.call(null,(new cljs.core.Keyword("\uFDD0'form")).call(null,body))):null);
var res = cljs.compiler.emit_str.call(null,body);
var ___$2 = (cljs.core.truth_(webrepl._STAR_debug_STAR_)?cljs.core.println.call(null,"EMITTED:",cljs.core.pr_str.call(null,res)):null);
var value = eval(res);
cljs.core._STAR_3 = cljs.core._STAR_2;
cljs.core._STAR_2 = cljs.core._STAR_1;
cljs.core._STAR_1 = value;
return cljs.core.ObjMap.fromObject(["\uFDD0'value","\uFDD0'js"],{"\uFDD0'value":value,"\uFDD0'js":res});
}catch (e3152){if(cljs.core.instance_QMARK_.call(null,Error,e3152))
{var e = e3152;
webrepl._STAR_e = e;
return cljs.core.ObjMap.fromObject(["\uFDD0'error"],{"\uFDD0'error":e.stack});
} else
{if("\uFDD0'else")
{throw e3152;
} else
{return null;
}
}
}});
webrepl.build_msg = (function build_msg(title,msg,klass){
return cljs.core.ObjMap.fromObject(["\uFDD0'msg","\uFDD0'className"],{"\uFDD0'msg":[cljs.core.str(title),cljs.core.str(msg)].join(''),"\uFDD0'className":klass});
});
webrepl.handle_input = (function handle_input(input){
var evaluated = webrepl.evaluate_code.call(null,input);
var temp__3971__auto__ = (function (){var and__3822__auto__ = evaluated;
if(cljs.core.truth_(and__3822__auto__))
{return (new cljs.core.Keyword("\uFDD0'error")).call(null,evaluated);
} else
{return and__3822__auto__;
}
})();
if(cljs.core.truth_(temp__3971__auto__))
{var err = temp__3971__auto__;
return webrepl.build_msg.call(null,"Compilation error: ",err,"jqconsole-message-error");
} else
{try{return webrepl.build_msg.call(null,"",cljs.core.pr_str.call(null,(new cljs.core.Keyword("\uFDD0'value")).call(null,evaluated)),"jqconsole-output");
}catch (e3154){if(cljs.core.instance_QMARK_.call(null,Error,e3154))
{var e = e3154;
return webrepl.build_msg.call(null,"Error: ",e,"jqconsole-message-error");
} else
{if("\uFDD0'else")
{throw e3154;
} else
{return null;
}
}
}}
});
webrepl.complete_form_QMARK_ = (function complete_form_QMARK_(text){
try{cljs.reader.read_string.call(null,text);
return true;
}catch (e3157){if(cljs.core.instance_QMARK_.call(null,Error,e3157))
{var e = e3157;
return cljs.core.not.call(null,cljs.core.re_find.call(null,/EOF while reading/,e.message));
} else
{if("\uFDD0'else")
{throw e3157;
} else
{return null;
}
}
}});
webrepl.start_prompt = (function start_prompt(){
var prompt_label = [cljs.core.str("\n"),cljs.core.str(webrepl.prompt.call(null))].join('');
var continue_label = [cljs.core.str(cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,(cljs.core.count.call(null,prompt_label) - 5)," "))),cljs.core.str("... ")].join('');
jqconsole.SetPromptLabel(prompt_label,continue_label);
return jqconsole.Prompt("true",(function (input){
var msg = webrepl.handle_input.call(null,input);
jqconsole.Write((new cljs.core.Keyword("\uFDD0'msg")).call(null,msg),(new cljs.core.Keyword("\uFDD0'className")).call(null,msg));
return start_prompt.call(null);
}),(function (p1__3155_SHARP_){
if(cljs.core.truth_(webrepl.complete_form_QMARK_.call(null,p1__3155_SHARP_)))
{return false;
} else
{return 0;
}
}));
});
jQuery(document).ready((function (){
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_emitted_provides_STAR_,cljs.core.conj,cljs.core.symbol.call(null,"cljs.user"));
goog.provide("cljs.user");
cljs.core._STAR_ns_sym_STAR_ = cljs.core.symbol.call(null,"cljs.user");
jqconsole = jQuery("#console").jqconsole("ClojureScript-in-ClojureScript Web REPL","\n>>> ","");
jqconsole.SetIndentWidth(1);
cljs.core._STAR_print_fn_STAR_ = (function (p1__3158_SHARP_){
return jqconsole.Write(p1__3158_SHARP_);
});
return webrepl.start_prompt.call(null);
}));