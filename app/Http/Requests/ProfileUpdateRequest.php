<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {

        return [
            'name' => ['string', 'max:255'],
            'last_name' => ['nullable','string', 'max:255'],
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'phone' => 'nullable|numeric|min:10',
            'country' => 'nullable|exists:countries,id',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'zip_code' => 'nullable|numeric|digits_between:5,10',
            'account' => 'nullable|numeric',
            'nic' => 'nullable|numeric|min:13',
            'dob' => 'nullable|date|before:today',
            'guardian_phone' => 'nullable|numeric|min:10',
            'address' => 'nullable|string|max:1000', 
        ];
    }
}
