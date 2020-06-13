<?php
require_once('../../config.php');
$cmid = required_param('id', PARAM_INIT);
$cm = get_coursemodule_from_id('answerGraph', $cmid, 0, false, MUST_EXIST);
$course = $DB->get_record('course', array('id' => $cm->course), '*', MUST_EXIST);

require_login($course, true, $cm);
$PAGE->set_url('/mod/answerGraph/view.php', array('id' => $cm->id));
$PAGE->set_title('Graph Assignment submission');
$PAGE->set_heading('Graph Creator');

$PAGE->set_context(context_system::instance());
$PAGE->set_pagelayout('embedded');

//TODO

$output = $PAGE->get_renderer('assignsubmission_graph');
$submissionrecord = get_record('graph_submissions', array(...));
$submissionwidget = new graph_submission($submissionrecord);
echo $output->header();
echo $output->render($submissionwidget);
echo $output->footer();
