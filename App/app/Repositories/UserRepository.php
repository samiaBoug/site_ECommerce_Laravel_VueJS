<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository
{
    public function findById($id)
    {
        return User::find($id);
    }

    public function update($id, array $data)
{
    $user = User::find($id);

    if (!$user) {
        throw new \Exception("User not found.");
    }

    $user->name = $data['name'];
    $user->email = $data['email'];

    if (!empty($data['password'])) {
        $user->password = Hash::make($data['password']);
    }

    $user->save();
    return $user;
}
}
