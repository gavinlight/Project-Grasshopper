@extends('admin-panel')

@section('content')

    <div class="panel panel-default">
        <div class="panel-heading clearfix">
            <h3 class="pull-left">Antwoord aanpassen</h3>
        </div>

        <div class="panel-body">

            {!! Form::model($answer, array('method' => 'PATCH', 'route' => ['admin.answers.update', $answer->id], 'class' => 'form-horizontal')) !!}
                @include('forms/_answers-form')
            {!! Form::close() !!}

        </div>

    </div>

@endsection