<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->hasRole('Admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'             => ['required', 'string', 'max:255'],
            'email_primary'    => ['required', 'email', 'max:255'],
            'email_secondary'  => ['nullable', 'email', 'max:255'],
            'phone_primary'    => ['required', 'string', 'max:20'],
            'phone_secondary'  => ['nullable', 'string', 'max:20'],
            'logo'             => ['nullable', 'image', 'max:2048'],
            'address'          => ['nullable', 'string', 'max:500'],
            'state'            => ['nullable', 'string', 'max:255'],
            'city'             => ['nullable', 'string', 'max:255'],
            'zip_code'         => ['nullable', 'string', 'max:20'],
            'country'       => ['required', 'exists:countries,id'],

            // social links
            'facebook'         => ['nullable', 'url', 'max:255'],
            'skype'            => ['nullable', 'string', 'max:255'],
            'linkedin'         => ['nullable', 'url', 'max:255'],
            'twitter'          => ['nullable', 'url', 'max:255'],
            'whatsapp'         => ['nullable', 'string', 'max:20'],
            'instagram'        => ['nullable', 'url', 'max:255'],

            // status & description
            'active_status'    => ['required', 'in:active,inactive'],
            'description'      => ['nullable', 'string', 'max:1000'],
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',

            'email_primary.required' => 'The primary email is required.',
            'email_primary.email' => 'Please enter a valid primary email address.',
            'email_primary.unique' => 'This primary email is already in use.',
            'email_secondary.email' => 'Please enter a valid secondary email address.',

            'phone_primary.required' => 'The primary phone number is required.',
            'phone_primary.max' => 'The primary phone number may not be greater than 20 characters.',
            'phone_secondary.max' => 'The secondary phone number may not be greater than 20 characters.',

            'logo.image' => 'The logo must be an image file.',
            'logo.max' => 'The logo may not be greater than 2MB.',

            'address.max' => 'The address may not be greater than 500 characters.',
            'state.max' => 'The state may not be greater than 255 characters.',
            'city.max' => 'The city may not be greater than 255 characters.',
            'zip_code.max' => 'The zip code may not be greater than 20 characters.',

            'country.required' => 'Please select a country.',
            'country.exists' => 'The selected country is invalid.',

            'facebook.url' => 'The Facebook link must be a valid URL.',
            'linkedin.url' => 'The LinkedIn link must be a valid URL.',
            'twitter.url' => 'The Twitter link must be a valid URL.',
            'instagram.url' => 'The Instagram link must be a valid URL.',

            'whatsapp.max' => 'The WhatsApp number may not be greater than 20 characters.',
            'skype.max' => 'The Skype field may not be greater than 255 characters.',

            'active_status.required' => 'The active status is required.',
            'active_status.in' => 'The active status must be either active or inactive.',

            'description.max' => 'The description may not be greater than 1000 characters.',
        ];
    }
}
