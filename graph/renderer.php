<?php
class graph_submission implements renderable {

    public function __construct(stdclass $submission, array $attachments = null) {
      //here the widget is prepared and all necessary logic is performed

    }

}

class assignsubmission_graph_renderer extends plugin_renderer_base {

    protected function render_graph_submission(graph_submission $submission) {
        $out = $this->output->heading(format_string($submission->title), 2);
        // TODO output submission contents
        return $this->output->container($out, 'submission');
    }

}
