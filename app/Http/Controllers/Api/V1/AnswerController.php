<?php namespace App\Http\Controllers\Api\V1;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Response;

class AnswerController extends Controller {

	public function index(){
        return Response::json(
            array(
                'answers' => \App\Answer::all()
            )
        );
	}

	public function show($id){
        return Response::json(
            array(
                'answer' =>  \App\Answer::find($id)
            )
        );
	}

    public function store(){

    }

}
