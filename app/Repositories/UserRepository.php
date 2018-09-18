<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{

  protected $user;

  public function __construct(User $user)
  {
    $this->user = $user;
  }

  public function isLastAdmin($id)
  {
    if($this->user->where('role', '=', 'admin')->count() == 1 && $this->user->find($id)->role == 'admin'){
      return true;
    }else return false;
  }

  public function roleChange($id, $role)
  {
    if($this->user->find($id)->role != $role){
      return true;
    }else return false;
  }

  public function getPaginate($n)
  {
    return $this->user->paginate($n);
  }

  public function getById($id)
  {
    return $this->user->findOrFail($id);
  }

  private function save(User $user, Array $inputs)
  {
    $user->save($inputs);
  }

  public function update($id, Array $inputs)
  {
    $this->getByid($id)->update($inputs);
  }

  public function destroy($id)
  {
    $this->getById($id)->delete();
  }
}
