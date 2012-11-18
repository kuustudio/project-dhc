<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

//BigPipe ，页面分段输出
class view{
    private $method;
    private $theme; //风格目录名称
    private $compilePath;//编译文件夹的路径
    private $filePath;//模板文件路径 name
    private $viewFile;//模板文件绝对路径
    private $compileFile; //编译文件的绝对路径

    const TYPE_DEFAULT  = 'default';
    const TYPE_REMOTE   = 'remote';
    const TYPE_ROOT     = 'root';


    public function assign($key, $val=null){
        if(is_string($key)){
            $this->vars[$key] = $val;
        }else if(is_array($key)){
            foreach($key as $k => $v){
                $this->vars[$k] = $v;
            }
        }
    }

    public function setPath($path, $theme = 'default'){
        if(!is_dir($path.DHC::getConfig('view_dir_name')))
            Error::logError(CORE_VIEW_EC_VIEW_NOT_EXISTS, EXCEPTION);
        if(!is_dir($path.DHC::getConfig('view_dir_name').DS.$theme))
            Error::logError(CORE_VIEW_EC_THEME_NOT_EXISTS, EXCEPTION);

        $this->themePath = $path.DHC::getConfig('view_dir_name').DS.$theme.DS;
    }
    /*  base::代表跟目录下的views
    *   scheme://user:pass@host
    *   app://
    *   remote url
    *   $param = array(
    *       'type' => 'remote'
    *       'file'  => '...'               
    *   )
    *   root view
    *   $param = array(
    *       'type'  => 'root',
    *       'theme' => '...' 可以为空
    *       'filename'  => '...'
    *   )
    *   一般状况下
    *   $param = array(
    *       'type'  => 'default',
    *       'app'   => '...', 可以为空
    *       'theme' => '...', 可以为空
    *       'controller'=> '...' 可以为空
    *       'action'=> '...' 可以为空
    *   )
    */
    public function _view($param = array()){
        if(empty($param['type']))   $param['type'] = self::TYPE_DEFAULT;
        if(!is_dir(DHC::getConfig('compile_dir_name')))
            Error::logError(CORE_VIEW_EC_C_VIEW_NOT_EXISTS, EXCEPTION);
        $this->compilePath = DHC::getConfig('compile_dir_name');
        if(empty($param)){
            $this->setPath(DHC_APP.DHC::getConfig('app').DS);
            $this->filePath = strtolower(DHC::getConfig('controller')).DS.strtolower(DHC::getConfig('action'));
        }else{
            if($param['type']==self::TYPE_REMOTE){
               $this->viewFile = $param['file'];
            }elseif($param['type']==self::TYPE_ROOT){
                $this->setPath(DHC_ROOT, empty($param['theme'])?DHC::getConfig('theme'):$param['theme']);
                $this->filePath = $param['filename'];
                $this->viewFile = $this->themePath.$this->filePath.DS.DHC::getConfig('view_file_subfix');
            }else{
                $app = empty($param['app'])?DHC::getConfig('app'):$param['app'];
                $theme = empty($param['theme'])?DHC::getConfig('theme'):$param['theme'];
                $controller = empty($param['controller'])?DHC::getConfig('controller'):$param['controller'];
                $action = empty($param['action'])?DHC::getConfig('action'):$param['action'];
                $this->setPath(DHC_APP.$app.DS, $theme);
                $this->filePath = strtolower($controller).DS.strtolower($action);
                $this->viewFile = $this->themePath.$this->filePath.DS.DHC::getConfig('view_file_subfix');
            }
        }
        $this->compileFile = $this->getComplieFile($this->viewFile);
       
        if(DHC::getConfig('view_complie')){
            if(!file_exists($this->compileFile))
                call_user_func_array(array($this,'view_parse_'.$param['type']), array());
            include($this->compileFile);
        }


    }

    public function _json($param = array()){

    }

    public function _file($param){

    }

    public function _error($param){

    }

    public function _content($param){

    }

    public function _script($param){

    }

    private function view_parse_default(){
        $this->themePath;
        $this->filePath;
        $this->viewFile;
        $this->compileFile;

        $filecontent = $this->view_filecontent($this->filePath);
        if($filecontent["type"] == "page"){
            $this->parse_page($filecontent);
        }else if($filecontent["type"] == "layout"){
            $this->parse_layout($filecontent);
        }
    }

    private function view_parse_remote(){
        file_put_contents($this->compileFile, file_get_contents($this->viewFile));
    }

    private function view_parse_root(){

    }

    private function getComplieFile($viewFile){
        return $this->compilePath.md5($viewFile);
    }

    function view_filecontent($name) {
        $array=array("name"=>$name,"type"=>"","layout"=>"","content"=>"");
        $filename = $this->themePath.$name.DHC::getConfig('view_file_subfix');
        $content = file_get_contents($filename);
        if(preg_match("/^\<\!\-\-\{\@([layout|page]+)( layout=\"([^\"]+?)\"){0,1}\}\-\-\>/ie", $content, $filetype)){
            $array["type"]=$filetype[1];
            $array["layout"]=isset($filetype[3])?$filetype[3]:"";
            $content = preg_replace("/^\<\!\-\-\{\@([\s\S]+?)\}\-\-\>/i","",$content);
            $array["content"]=$content;
        }
        return $array;
    }

    private function parse_layout(){

        $content = $filecontent["content"];
        $contents=array();
        $preg_pattern="/\<\!\-\-\{content\s+([a-z0-9_\/]+)\}\-\-\>([\s\S]+?)\<\!\-\-{\/content}\-\-\>/ie";
        if(preg_match_all($preg_pattern, $content,$tcontent)){
            foreach($tcontent[1] as $matchcontent){
                $contents[$matchcontent]="";
            }
            for($i=0;$i<count($tcontent[2]);$i++){
                $contents[$tcontent[1][$i]]=$tcontent[2][$i];
            }
        }
        if($filecontent["layout"]!=""){
            $contentwithmaster = $this->template_compiled_content($filecontent["layout"]);

            $contentwithmaster = preg_replace_callback(
                "/\<\!\-\-\{contentplaceholderid\s+([a-z0-9_\/]+)\}\-\-\>/i",
                function($cid)use($contents){ return isset($contents[$cid[1]]) ? $contents[$cid[1]] : ''; },
                $contentwithmaster
            );
            $content=$contentwithmaster;
        }
        $this->template_writefile($compiled, trim($content));        
    }

    private function parse_page(){

    }

    function template_compiled_content($name) {
        if(!$this->template_iscompiled($name)){
            $this->template_parse($name);
        }
        $filename = $this->template_compilepath($name);
        $content = file_get_contents($filename);
        return $content;
        if(DHC::getConfig('view_complie')){
            $compileFile = $this->getComplieFile($this->themePath.$name.DS.DHC::getConfig('view_file_subfix'));
            if(!file_exists($compileFile))
                call_user_func_array(array($this,'view_parse_default'), array());
            include($this->compileFile);
        }
    }

    function template_parse($name){
        $filecontent = $this->view_filecontent($name);
        if($filecontent["type"] == "page"){
            $this->template_parse_page($filecontent);
        }else if($filecontent["type"] == "master"){
            $this->template_parse_master($filecontent);
        }else if($filecontent["type"] == "control"){
            $this->template_parse_control($filecontent);
        }
    }
    function template_parse_master($filecontent){
        $tplfile = $this->template_filepath($filecontent["name"]);
        $compiled = $this->template_compilepath($filecontent["name"]);

        $content = $filecontent["content"];
        $contents=array();
        $preg_pattern="/\<\!\-\-\{content\s+([a-z0-9_\/]+)\}\-\-\>([\s\S]+?)\<\!\-\-{\/content}\-\-\>/ie";
        if(preg_match_all($preg_pattern, $content,$tcontent)){
            foreach($tcontent[1] as $matchcontent){
                $contents[$matchcontent]="";
            }
            for($i=0;$i<count($tcontent[2]);$i++){
                $contents[$tcontent[1][$i]]=$tcontent[2][$i];
            }
        }
        if($filecontent["masterfile"]!=""){
            $contentwithmaster = $this->template_compiled_content($filecontent["masterfile"]);

            $contentwithmaster = preg_replace_callback(
                "/\<\!\-\-\{contentplaceholderid\s+([a-z0-9_\/]+)\}\-\-\>/i",
                function($cid)use($contents){ return isset($contents[$cid[1]]) ? $contents[$cid[1]] : ''; },
                $contentwithmaster
            );
            $content=$contentwithmaster;
        }
        $this->template_writefile($compiled, trim($content));
    }
    function template_parse_control($filecontent){

        $tplfile = $this->template_filepath($filecontent["name"]);
        $compiled = $this->template_compilepath($filecontent["name"]);
        $content = $filecontent["content"];
        $this->template_writefile($compiled, trim($content));
    }
    function template_parse_page($filecontent){
        $tplfile = $this->template_filepath($filecontent["name"]);
        $compiled = $this->template_compilepath($filecontent["name"]);

        $content = $filecontent["content"];

        $contents=array();
        $preg_pattern="/\<\!\-\-\{content\s+([a-z0-9_\/]+)\}\-\-\>([\s\S]+?)\<\!\-\-{\/content}\-\-\>/ie";
        if(preg_match_all($preg_pattern, $content, $tcontent)){
            foreach($tcontent[1] as $matchcontent){
                $contents[$matchcontent]="";
            }
            for($i=0;$i<count($tcontent[2]);$i++){
                $contents[$tcontent[1][$i]]=$tcontent[2][$i];
            }
        }

        //解析 master
        if($filecontent["masterfile"] != ""){
            $contentwithmaster = $this->template_compiled_content($filecontent["masterfile"]);
            
            if(preg_match_all("/\<\!\-\-\{contentplaceholderid ([\S]+)\}\-\-\>/ie",$contentwithmaster,$holdermatchs)){

                foreach($holdermatchs[1] as $holdermatch){
                    $contentwithmaster = preg_replace(
                        "/\<\!\-\-\{contentplaceholderid $holdermatch\}\-\-\>/i",
                        isset($contents[$holdermatch]) ? $contents[$holdermatch] : "",
                        $contentwithmaster
                        );
                }
            }
            $content = $contentwithmaster;
        }

        //解析 includefile
        $includefile_pattern="/\<\!\-\-\{includefile\:([\S]+?)\}\-\-\>/ie";
        $includefiles=array();
        if(preg_match_all($includefile_pattern, $content,$tincludefiles)){
            for($i=0;$i<count($tincludefiles[1]);$i++){

                $f = $this->template_filepath($tincludefiles[1][$i]);
                if($f == ''){
                    $include_file = substr($tincludefiles[1][$i],0,strrpos($filecontent["name"],'/')) . '/' . $tincludefiles[1][$i];
                }else{
                    $include_file = $tincludefiles[1][$i];
                }

                $includefiles[$tincludefiles[1][$i]]=array(
                    "file" => $tincludefiles[1][$i],
                    "content" => $this->template_compiled_content($include_file)
                    );
            }
        }
            foreach($includefiles as $includekey => $includefile){
                $content=str_replace("<!--{includefile:".$includefile["file"] . "}-->",$includefile["content"],$content);
            }

        //解析 control
        $control_pattern="/\<\!\-\-\{control\:([\S]+?)\ id\=\"([^\"]+)\"}\-\-\>/ie";
        $controls = array();
        
        if(preg_match_all($control_pattern, $content,$tcontrols)){
            for($i=0;$i<count($tcontrols[1]);$i++){
                $f = $this->template_filepath($tcontrols[1][$i]);
                if($f == ''){
                    $control_file = substr($filecontent["name"], 0, strrpos($filecontent["name"],'/')) . '/' . $tcontrols[1][$i];
                    
                }else{
                    $control_file = $tcontrols[1][$i];
                }
                $controls[$tcontrols[2][$i]]=array(
                    "id" => $tcontrols[2][$i],
                    "controlname" => $tcontrols[1][$i],
                    "content" => $this->template_compiled_content($control_file)
                    );
            };
            foreach($controls as &$control){
                
                $var_pattern="/\<\!\-\-\{\@var ([^\}]+)\}\-\-\>/ie";
                $vars=array();
                if(preg_match_all($var_pattern, $control["content"], $matchvars)){
                    $vars=explode(' ',$matchvars[1][0]);
                }
                
                $tagvar_pattern="/\\$\_var\_((?:" . implode("|",explode(",",$matchvars[1][0])) . ")+?)/i";
                $control["content"]=preg_replace(
                        $tagvar_pattern,
                        '$'. $control["id"] . "['\\1']",
                        $control["content"]
                    );

                $control["content"] = preg_replace("/\<\!\-\-\{\@var ([^\}]+)\}\-\-\>/i","",$control["content"]);
                
            }
        }
        foreach($controls as $key=>$c){
            $content = str_replace("<!--{control:".$c["controlname"] . " id=\"" . $c["id"] . "\""."}-->",$c["content"],$content);
        }
        
        $this->template_writefile($compiled, trim($content));
    }
}
