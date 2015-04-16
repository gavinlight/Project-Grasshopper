@extends('admin-panel')

@section('content')

    <div class="panel panel-default">
        <div class="panel-heading clearfix">
            <h3 class="pull-left">Nieuw antwoord</h3>
        </div>

        <div class="panel-body">

            {!! Form::model(new App\Answer, array('route' => ['admin.answers.store'], 'class' => 'form-horizontal')) !!}
                @include('forms/_answers-form')
            {!! Form::close() !!}

        </div>

    </div>

@endsection