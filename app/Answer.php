<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model {

    protected $guarded = array('_token');

    private $summary_length = 50;

    public function getSummary($text){
        if(strlen($text) >= $this->summary_length){
            return substr($text, 0, $this->summary_length) . '...';
        } else {
            return $text;
        }
    }

    public function getKeyWords(){
        $keywords = explode(', ', $this->keywords);

        for($i = 0; $i < count($keywords); $i++){
            $keywords[$i] = ucfirst(strtolower($keywords[$i]));
        }

        return implode(', ', $keywords);
    }

    public function getCleanContent(){
        return strip_tags( str_replace('<br>', ' ', $this->content) );
    }

}
