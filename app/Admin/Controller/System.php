<?php
class Admin_Controller_System extends Admin_Controller_Base{

    private $_dbMap;
    private $_index = array(
        'UNI' => '唯一约束',
        'MUL' => '一般索引'
    );
    private $_types = array(
        PARAM_STRING    => 'PARAM_STRING',
        PARAM_INT       => 'PARAM_INT',
        PARAM_UINT      => 'PARAM_UINT',
        PARAM_SINT      => 'PARAM_SINT',
        PARAM_FLOAT     => 'PARAM_FLOAT',
        PARAM_BOOL      => 'PARAM_BOOL',
        PARAM_HEX       => 'PARAM_HEX',
        PARAM_EXISTS    => 'PARAM_EXISTS',
        PARAM_ARRAY     => 'PARAM_ARRAY',
        PARAM_RAW       => 'PARAM_RAW',
        PARAM_STRIPTAGS => 'PARAM_STRIPTAGS',
        PARAM_HASHVAR   => 'PARAM_HASHVAR',
        PARAM_MD5       => 'PARAM_MD5',
        PARAM_ERROR     => 'PARAM_ERROR',
        PARAM_ALLOW_A   => 'PARAM_ALLOW_A',
        PARAM_ALLOW_B   => 'PARAM_ALLOW_B',
        PARAM_USERID    => 'PARAM_USERID',
        PARAM_OBJID     => 'PARAM_OBJID',
        PARAM_DATETIME  => 'PARAM_DATETIME',
        PARAM_EMAIL     => 'PARAM_EMAIL',
        PARAM_IPV4      => 'PARAM_IPV4',
        PARAM_DOMAIN    => 'PARAM_DOMAIN',
        PARAM_AUTO_INCREMENT => 'PARAM_AUTO_INCREMENT',
        PARAM_TEXT      => 'PARAM_TEXT',
        PARAM_ID        => 'PARAM_ID',
        PARAM_UID       => 'PARAM_UID',
        PARAM_TID       => 'PARAM_TID',
        PARAM_URLMD5    => 'PARAM_URLMD5',
        PARAM_NULLOK    => 'PARAM_NULLOK',
    );

    public function init(){
        $this->_dbMap = Monk::getConfig('db_map');
        parent::init();
    }

    public function actionDictionary(){
        $this->assign('Title','数据字典');
        $this->assign('db_map',$this->_dbMap);
        $this->_setType(array('table_name'=>PARAM_STRING));
        $tableName = $this->_get('table_name');
        if(empty($tableName)) $tableName = key($this->_dbMap);
        $this->assign('table_name',$tableName);
        $model = Monk::getSingleton('Admin_Model_'.$tableName);
        $map = $model->getMap($tableName);
        $cols = $model->q('SHOW FULL COLUMNS FROM '.$map['table']);
        foreach($cols as $k=>$col){
            $tip = '';
            $info = '';
            $errorClass = '';
            if ($col['Key'] == 'PRI') {
                $tip .= ' √ ';
                if ($col['Field'] != $map['primary']['name']) {
                    $errorClass = 'error';
                    $info = '主键配置错误！';
                }
                if ($col['Extra'] == 'auto_increment') {
                    $tip .= ' ↑ ';
                    if (empty($map['primary']['auto_increment'])) {
                        $errorClass = 'error';
                        $info = '自增配置错误！';
                    }
                }
            }elseif (!empty($col['Key'])) {
                $tip .= ' K('.$this->_index[$col['Key']].') ';
            }
            if ($col['Null'] == 'YES') {
                $tip .= ' ● ';
            }else{
                $tip .= ' ○ ';
            }
            $index = stripos($col['Type'], '(');
            $cols[$k]['s_type'] = substr($col['Type'], 0, $index);
            $cols[$k]['type_num'] = substr($col['Type'], $index+1, -1);
            $cols[$k]['tip'] = $tip;
            $cols[$k]['errorClass'] = $errorClass;
            $cols[$k]['info'] = $info;
            $cols[$k]['map_type'] = $this->_types[$map['field'][$col['Field']]];
        }
        $this->assign('cols',$cols);
        $this->assign('cols_count',count($cols));
        $this->render();
    }
}