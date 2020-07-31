<?php
namespace ModelViewer3D\Media\Ingester;

use Omeka\Api\Request;
use Omeka\Entity\Media;
use Omeka\Media\Ingester\IngesterInterface;
use Omeka\Stdlib\ErrorStore;
use Zend\Form\Element\Text;
use Zend\View\Renderer\PhpRenderer;

class ModelViewer3D implements IngesterInterface

{
    public function getLabel()
    {
        return 'Model Viewer 3D';
    }

    public function getRenderer()
    {
        return 'model_viewer_3d';
    }

    public function ingest(Media $media, Request $request, ErrorStore $errorStore)
    {
        $data = $request->getContent();
        if (!isset($data['o:source'])) {
            $errorStore->addError('0:source', 'No filename specified');
            return;
        }

        $media->setData($data);
    }

    public function form(PhpRenderer $view, array $options = [])
    {
        $filename = new Text('o:media[__index__][o:source]');
        $filename->setOptions([
            'label' => 'Filename',
            'info' => 'The root filename without the file extension.',
        ]);

        return $view->formRow($filename);
    }
}

