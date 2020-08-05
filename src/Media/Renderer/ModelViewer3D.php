<?php
namespace ModelViewer3D\Media\Renderer;

use Omeka\Api\Representation\MediaRepresentation;
use Omeka\Media\Renderer\RendererInterface;
use Zend\ServiceManager\ServiceLocatorInterface;
use Zend\View\Renderer\PhpRenderer;

class ModelViewer3D implements RendererInterface
{

    
    public function render(PhpRenderer $view, MediaRepresentation $media, array $options = []){
        $this->addCSS($view);
        $baseURL = $view->setting('model_viewer_3d_baseURL');
        $data = $media->mediaData();
        $filename = $data['o:source'];
        $url = $baseURL.$filename;
        
        return '<div class="model-viewer-3d" data-modelurl="'.$url.'"><script src="'.$this->addJS($view).'" type="module"></script><div id="loading-screen"><div id="loader"></div></div></div>';
    }

    public function addJS(PhpRenderer $view){      
        return $view->assetUrl('js/modelviewer3d.js', 'ModelViewer3D');
    }

    public function addCSS(PhpRenderer $view){
        $view->headLink()->appendStylesheet($view->assetUrl('css/style.css', 'ModelViewer3D'));
    }

}