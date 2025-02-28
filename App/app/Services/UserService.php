<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService
{
    protected $userRepo;

    public function __construct(UserRepository $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function updateUser($id, array $data)
    {
        return $this->userRepo->update($id, $data);
    }
}
