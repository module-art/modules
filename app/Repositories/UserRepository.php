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
    $role = $this->user->find($id)->role;

    if($this->user->where('role', 'regexp', 'admin|maintainer')->count() == 1 && ( $role == 'admin' || $role == 'maintainer')){
      return true;
    }else return false;
  }

  public function roleChange($id, $role)
  {
    if($this->user->find($id)->role != $role && $role == 'user'){
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
