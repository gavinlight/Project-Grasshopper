@extends('admin-panel')

@section('content')

    <div class="panel panel-default">
        <div class="panel-heading clearfix">
            <h3 class="pull-left">Antwoorden</h3>
            <a href="{{ action('AnswerController@create') }}" class="btn btn-primary pull-right new-record">Nieuw antwoord</a>
        </div>

        <div class="panel-body">

            <div class="table-responsive">

                <table class="table table-striped table-bordered">

                    <thead>
                        <tr>
                            <th>Titel</th>
                            <th>Antwoord</th>
                            <th>Trefwoorden</th>
                            <th>Acties</th>
                        </tr>
                    </thead>

                    <tbody>

                        @foreach($answers as $answer)
                            <tr>
                                <td>{{ $answer->title }}</td>
                                <td>{{ $answer->getCleanContent() }}</td>
                                <td>{{ $answer->getSummary($answer->getKeywords()) }}</td>
                                <td class="text-center">
                                    <a href="{{ action('AnswerController@edit', $answer->id) }}" class="btn btn-primary">
                                        Aanpassen
                                    </a>

                                    {!! Form::open(array('class' => 'delete-form', 'method' => 'DELETE', 'route' => array('admin.answers.destroy', $answer->id))) !!}

                                            {!! Form::submit('Verwijderen', array('class' => 'btn btn-danger')) !!}

                                    {!! Form::close() !!}
                                </td>
                            </tr>
                        @endforeach

                    </tbody>


                </table>

            </div>

        </div>

    </div>

@endsection