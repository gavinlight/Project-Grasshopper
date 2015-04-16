<?php namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as LaravelsVerifyCsrfToken;

class VerifyCrsfMiddleware extends LaravelsVerifyCsrfToken {

    private $openRoutes =
        [
            'api/v1/answers'
        ];

    public function handle($request, Closure $next)
    {

        foreach($this->openRoutes as $route)
        {
            if ($request->is($route))
            {
                return $next($request);
            }
        }

        return parent::handle($request, $next);
    }

}