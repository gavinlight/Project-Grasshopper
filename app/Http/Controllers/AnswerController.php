<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Input;
use Redirect;
use Session;

use Illuminate\Http\Request;

class AnswerController extends Controller {

    protected $fillable = array('title', 'content', 'keywords', 'source');

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		Return view('answers')->with('answers', \App\Answer::all())->with('message', Session::get('message'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
        Return view('answers-create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
        \App\Answer::create( Input::all() );

        return Redirect::route('admin.answers.index')->with('message', 'Antwoord aangemaakt');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
        Return view('answers-edit')->with('answer', \App\Answer::find($id));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$answer = \App\Answer::find($id);
        $answer->update(array_except(Input::all(), '_method'));

        return Redirect::route('admin.answers.index')->with('message', 'Antwoord aangepast');
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
        $answer = \App\Answer::find($id);
        $answer->delete();

	    return Redirect::route('admin.answers.index')->with('message', 'Antwoord verwijderd');
	}

}
