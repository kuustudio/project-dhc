<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');
/**
* 控制器内调用规则
* rander(array(),'view'); 默认
* rander(array('xx'=>xx,'json')); xx为视图配置参数,包含type,file(可选)等等，一般性传入由assign($key,$value);
*
* view type 结构性总览
* 3种类型
* default 默认视图类型，属于每个app下标准视图结构
*   appname
*       views
*           theme
*               layout 布局文件
*               block 区块文件
*               controller
*                   action.php 标准控制器对应文件
* remote 远程文件
*   file 远程文件路径
* root 根目录全局视图，风格等同于默认
*   根目录
*       views
*           theme
*               layout 布局文件
*               block 区块文件
*               filename.php 对应文件
* 编译文件规范
*   根目录
*       c_views
*           type 编译视图的类型TYPE_DEFAULT，TYPE_REMOTE，TYPE_ROOT
*           TYPE_DEFAULT
*           TYPE_ROOT
*           TYPE_REMOTE
*               filename
*/

//BigPipe ，页面分段输出
class view{
    private $theme; //风格目录名称
    private $filePath;//模板文件路径 name
    private $viewFile;//模板文件绝对路径
    private $compileFile;//编译文件路径
    private $themePath;//模板路径

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
        if(empty($param['type'])) $param['type'] = self::TYPE_DEFAULT;

        if(empty($param)){
            //$this->setPath(DHC_APP.DHC::getConfig('app').DS);
            //$this->filePath = strtolower(DHC::getConfig('controller')).DS.strtolower(DHC::getConfig('action'));
        }else{
            if($param['type']==self::TYPE_REMOTE){
               $this->viewFile = $param['file'];
            }elseif($param['type']==self::TYPE_ROOT){
                $this->setPath(DHC_ROOT, empty($param['theme'])?DHC::getConfig('theme'):$param['theme']);
                $this->filePath = strtolower($param['filename']);
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
       
        if(DHC::getConfig('view_complie')){
            $this->compileFile = $this->getComplieFile($this->viewFile,$param['type']);
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
        $filecontent = $this->view_filecontent($this->filePath);
        call_user_func_array(array($this,'parse_'.$filecontent['type']), array($filecontent));
    }

    private function view_parse_remote(){
        file_put_contents($this->compileFile, file_get_contents($this->viewFile));
    }

    private function view_parse_root(){

    }

    private function getComplieFile($viewFile, $type = self::TYPE_DEFAULT){
        $compile_dir = DHC::getConfig('compile_dir');
        if(!is_dir($compile_dir.$type))
            Error::logError(CORE_VIEW_EC_C_VIEW_NOT_EXISTS, EXCEPTION);
        return $compile_dir.$type.DS.md5($viewFile);
    }

    private function getViewFile($name){
        return $this->themePath.$name.DHC::getConfig('view_file_subfix');
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

    private function parse_page($filecontent){
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

        //解析 layout
        if($filecontent["layout"] != ""){
            $contentwithlayout = file_get_contents($this->getViewFile($filecontent["layout"]));
            
            if(preg_match_all("/\<\!\-\-\{contentplaceholderid ([\S]+)\}\-\-\>/ie",$contentwithlayout,$holdermatchs)){

                foreach($holdermatchs[1] as $holdermatch){
                    $contentwithlayout = preg_replace(
                        "/\<\!\-\-\{contentplaceholderid $holdermatch\}\-\-\>/i",
                        isset($contents[$holdermatch]) ? $contents[$holdermatch] : "",
                        $contentwithlayout
                        );
                }
            }
            $content = $contentwithlayout;
        }
        
        file_put_contents($this->compileFile, trim($content));
    }
}
