<div class="form-group">
    {!! Form::label('title', 'Titel', array('class' => 'col-sm-2 control-label bold')) !!}

    <div class="col-sm-10">
        {!! Form::text('title', Input::old('title'), array('class' => 'form-control')) !!}
    </div>
</div>

<div class="form-group">
    {!! Form::label('content', 'Inhoud', array('class' => 'col-sm-2 control-label bold')) !!}

    <div class="col-sm-10">
        {!! Form::textarea('content', Input::old('content'), array('class' => 'form-control wysiwyg')) !!}
    </div>
</div>

<div class="form-group">
    {!! Form::label('keywords', 'Trefwoorden', array('class' => 'col-sm-2 control-label bold')) !!}

        <div class="col-sm-10">
            {!! Form::text('keywords', Input::old('keywords'), array('class' => 'form-control')) !!}
        </div>
</div>

<div class="form-group">
    {!! Form::label('source', 'Bron', array('class' => 'col-sm-2 control-label bold')) !!}

        <div class="col-sm-10">
            <div class="input-group">

                <span class="input-group-addon">http://</span>
                {!! Form::text('source', Input::old('source'), array('class' => 'form-control')) !!}

            </div>
        </div>
</div>

<div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
        {!! Form::submit('Verstuur', ['class'=>'btn btn-primary']) !!}
    </div>
</div>