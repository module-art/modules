<?php

namespace App\Http\Controllers;

use Mail;
use Auth;
use Illuminate\Http\Request;
use App\Http\Requests\ContactRequest;
use App\Http\Requests\PageRequest;
use App\Repositories\FooterRepository;
use App\Repositories\MenusRepository;
use App\Models\Page;
use App\Models\Rubrique;
use App\Models\Bloc;
use App\Models\User;

class PageController extends Controller
{
  
  protected $footerRepository;

  public function __construct(FooterRepository $footerRepository, MenusRepository $menusRepository)
  {
    $this->footerRepository = $footerRepository;
    $this->menusRepository = $menusRepository;
  }

  public function show($slug)
  {
    $page = Page::where('slug', $slug)->where('publie', 1)->firstOrFail();

    $footer = $this->footerRepository->makeFooter();
    $menus = $this->menusRepository->makeMenus();
    return view('front.page', compact('menus', 'page', 'footer'));
  }

  public function backShow($slug)
  {

    $page = Page::where('slug', $slug)->firstOrFail();
    $footer = $this->footerRepository->makeFooter();
    $menus = $this->menusRepository->makeAdminMenus();
    return view('back.page', compact('menus', 'page', 'footer'));
  }

  public function create(){
    $operation = 'create';
    $menus = $this->menusRepository->makeAdminMenus();
    $footer = $this->footerRepository->makeFooter();
    return view('back.new_page', compact('menus', 'operation', 'footer'));
  }

  public function store(PageRequest $request){

    $maxplace = Page::max('place');
    //return response($maxplace);

    $inputs = array_merge($request->all(), [
      'place' => $maxplace+1,
      'slug' => str_slug($request->menu_title),
      'publie' => 0,
    ]);

    $page = Page::create($inputs);

    $default_attr = array(
      'contenu' => '<h2>' . $request->menu_title . '</h2>',
      'place' => 1,
      'cols' => 2,
      'ascendant' => 1,
      'page_id' => $page->id
    );

    Rubrique::create($default_attr);

    return redirect()->route('back_page.show', $page->slug);
  }

  public function edit($id){
    $operation = 'edit';
    $page = Page::findOrFail($id);
    $menus = $this->menusRepository->makeAdminMenus();
    $footer = $this->footerRepository->makeFooter();
    return view('back.new_page', compact('menus', 'page', 'operation', 'footer'));
  }

  public function update(PageRequest $request, $id){

    $page = Page::findOrFail($id);

    $from_menu = (boolean)$page->place;
    $to_menu = (boolean)$request->place;

    //dd($request);
    //return response('from : ' . $from_menu . ' , to : ' . $to_menu);

    if($from_menu && $to_menu){

      if($page->place < $request->place){
        $places_to_move = Page::where('place', '>', $page->place)->where('place', '<=', $request->place)->get();
        //dd($places_to_move);

        foreach($places_to_move as $newplace){
          $newplace->place = $newplace->place - 1;
          $newplace->save();
        }
      }else{
        $places_to_move = Page::where('place', '>=', $request->place)->where('place', '<', $page->place)->get();
        //dd($places_to_move);

        foreach($places_to_move as $newplace){
          $newplace->place = $newplace->place + 1;
          $newplace->save();
        }
      }

    }elseif(!$from_menu && $to_menu){

      $places_to_move = Page::where('place', '>=', $request->place)->get();
      if($places_to_move){
        foreach($places_to_move as $newplace){
          $newplace->place = $newplace->place + 1;
          $newplace->save();
        }
      }

    }elseif($from_menu && !$to_menu){

      $places_to_move = Page::where('place', '>=', $page->place)->get();
      if($places_to_move){
        foreach($places_to_move as $newplace){
          $newplace->place = $newplace->place - 1;
          $newplace->save();
        }
      }
    }

    $inputs = array_merge($request->all(), [
      'slug' => str_slug($request->menu_title),
    ]);

    $page->update($inputs);

    return redirect()->route('back_page.show', $page->slug);
  }

  public function mailFromContact(ContactRequest $request)
  {

    //return response()->json(['response' => $request->subject]);
    Mail::send('back.email_contact', $request->all(), function($message)
    {
      $message->to('contact@batipos.fr')->subject('Message du site');
    });
 
    return response()->json(['response' => 'Le message est bien envoyé.']);
  }

  public function destroy($id)
  {
    $page = Page::findOrFail($id);

    $places_to_move = Page::where('place', '>', $page->place)->get();

    if($places_to_move){
      foreach($places_to_move as $newplace){
        $newplace->place = $newplace->place - 1;
        $newplace->save();
      } 
    } 
    
    $page->delete();

    return response('La page '.$id . ' et ce qu\'elle contient viennent d\'être effacés.' );
  }

  public function switchPublication($id)
  {
    $page = Page::findOrFail($id);
    $state = $page->publie;

    if($state){
      $state = 0;
      $verbe = " n'est plus ";
    }else{
      $state = 1;
      $verbe = " est ";
    }
    
    $page->publie = $state;
    $page->save();

    return response('La page '. $page->menu_title . $verbe . 'accessible aux visiteurs.');
  }
}
