<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * This file contains the definition for the library class for graph submission plugin
 *
 * This class provides all the functionality for the new assign module.
 *
 * @package assignsubmission_graph
 * @copyright 2020 Chloë Smith <1877342@students.wits.ac.za>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();
// File area for online text submission assignment.
define('ASSIGNSUBMISSION_graph_FILEAREA', 'submissions_graph');

/**
 * library class for graph submission plugin extending submission plugin base class
 *
 * @package assignsubmission_graph
 * @copyright 2020 Chloë Smith <1877342@students.wits.ac.za>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class assign_submission_graph extends assign_submission_plugin {

    /**
     * Get the name of the online text submission plugin
     * @return string
     */
    public function get_name() {
        return get_string('graph', 'assignsubmission_graph');
    }


    /**
     * Get graph submission information from the database
     *
     * @param  int $submissionid
     * @return mixed
     */
    private function get_graph_submission($submissionid) {
        global $DB;

        return $DB->get_record('assignsubmission_graph', array('submission'=>$submissionid));
    }

    /**
     * Remove a submission.
     *
     * @param stdClass $submission The submission
     * @return boolean
     */
    public function remove(stdClass $submission) {
        global $DB;

        $submissionid = $submission ? $submission->id : 0;
        if ($submissionid) {
            $DB->delete_records('assignsubmission_graph', array('submission' => $submissionid));
        }
        return true;
    }

    /**
     * Get the settings for graph submission plugin
     *
     * @param MoodleQuickForm $mform The form to add elements to
     * @return void
     */
    public function get_settings(MoodleQuickForm $mform) {
        global $CFG, $COURSE;

        // the get_settings function is called when building the settings page for the assignment
        // it allows the plugin to add a list of settings to the form
        // the settings are prefixed by the plugin name to avoid conflicts with other plugins

        //TODO get assignment specific settings

        //EXAMPLE CODE
        /*$defaultmaxfilesubmissions = $this->get_config('maxfilesubmissions');
        $defaultmaxsubmissionsizebytes = $this->get_config('maxsubmissionsizebytes');

        $settings = array();
        $options = array();
        for ($i = 1; $i <= assignsubmission_graph_MAXFILES: $i++) {
          $options[$i] = $i;
        }

        $name = get_string('maxfilessubmission', 'assignsubmission_graph');
        $mform->addElement('select', 'assignsubmission_graph_maxfiles', $name, $options);
        $mform->addHelpButton('assignsubmission_graph_maxfiles',
                              'maxfilessubmission',
                              'assignsubmission_graph');
        $mform->setDefault('assignsubmission_graph_maxfiles', $defaultmaxfilesubmissions);
        $mform->disabledIf('assignsubmission_graph_maxfiles', 'assignsubmission_graph_enabled', 'notchecked');

        $choices = get_max_upload_sizes($CFG->maxbytes,
                                        $COURSE->maxbytes,
                                        get_config('assignsubmission_graph', 'maxbytes'));

        $settings[] = array('type' => 'select',
                            'name' => 'maxsubmissionsizebytes',
                            'description' => get_string('maximumsubmissionsize', 'assignsubmission_graph'),
                            'options' => $choices,
                            'default' => $defaultmaxsubmissionsizebytes);

        $name = get_string('maximumsubmissionsize', 'assignsubmission_graph');
        $mform->addElement('select', 'assignsubmission_graph_maxsizebytes', $name, $choices);
        $mform->addHelpButton('assignsubmission_graph_maxsizebytes',
                              'maximumsubmissionsize',
                              'assignsubmission_graph');
        $mform->setDefault('assignsubmission_graph_maxsizebytes', $defaultmaxsubmissionsizebytes);
        $mform->disabledIf('assignsubmission_graph_maxbytes',
                           'assignsubmission_graph_enabled',
                           'notchecked'); */
    }

    /**
     * Save the settings for graph submission plugin
     *
     * @param stdClass $data
     * @return bool
     */
    public function save_settings(stdClass $data) {
        // save_settings is called when the assignment settings page is submitted
        // either for a new assignment or when editing an existing one
        // for settings specific to a single instance of the assignment,
        //  use the assign_plugin::set_config function to save key/value pairs
        //  as shown below against the assignment instance for this plugin.

        //$this->set_config('maxfilesubmissions', $data->assignsubmission_graph_maxfiles);
        //$this->set_config('maxsubmissionsizebytes', $data->assignsubmission_graph_maxsizebytes);
        return true;
    }

    /**
     * Add form elements for settings
     *
     * @param mixed $submission can be null
     * @param MoodleQuickForm $mform
     * @param stdClass $data
     * @return true if elements were added to the form
     */
    public function get_form_elements($submission, MoodleQuickForm $mform, stdClass $data) {
        // get_form_elements is called when building the submission form
        // it functions identically to the get_settings function, except that
        //  the submission object is available (if there is a submission) to
        //  associate the settings with a single submission.
        // the function must return true if it has modified the form,
        //  otherwise the assignment will not include a header for this plugin


        // TODO load JS in submission form

        $PAGE->requires-js('graphgenerator/js/handlers.js');
        $PAGE->requires-js('graphgenerator/js/Edge.js');
        $PAGE->requires-js('graphgenerator/js/Graph.js');
        $PAGE->requires-js('graphgenerator/js/main.js');
        $PAGE->requires-js('graphgenerator/js/Vertex.js');

        $PAGE->requires->css('graphgenerator/css/labs_print.css');
        $PAGE->requires->css('graphgenerator/css/labs_screen.css');

        




        /*$elements = array();

        $editoroptions = $this->get_edit_options();
        $submissionid = $submission ? $submission->id : 0;

        if (!isset($data->graph)) {
            $data->graph = '';
        }
        if (!isset($data->graphformat)) {
            $data->graphformat = editors_get_preferred_format();
        }

        if ($submission) {
            $graphsubmission = $this->get_graph_submission($submission->id);
            if ($graphsubmission) {
                $data->graph = $graphsubmission->graph;
                $data->graphformat = $graphsubmission->graphformat;
            }

        }

        $data = file_prepare_standard_editor($data,
                                             'graph',
                                             $editoroptions,
                                             $this->assignment->get_context(),
                                             'assignsubmission_graph',
                                             ASSIGNSUBMISSION_graph_FILEAREA,
                                             $submissionid);
        $mform->addElement('editor', 'graph_editor', $this->get_name(), null, $editoroptions);

        return true; */
    }

    /**
     * Editor format options
     *
     * @return array
     */
    private function get_edit_options() {
        $editoroptions = array(
            'noclean' => false,
            'maxfiles' => EDITOR_UNLIMITED_FILES,
            'maxbytes' => $this->assignment->get_course()->maxbytes,
            'context' => $this->assignment->get_context(),
            'return_types' => (FILE_INTERNAL | FILE_EXTERNAL | FILE_CONTROLLED_LINK),
            'removeorphaneddrafts' => true // Whether or not to remove any draft files which aren't referenced in the text.
        );
        return $editoroptions;
    }

    /**
     * Save data to the database and trigger plagiarism plugin,
     * if enabled, to scan the uploaded content via events trigger
     *
     * @param stdClass $submission
     * @param stdClass $data
     * @return bool
     */
    public function save(stdClass $submission, stdClass $data) {
        // save is called to save a user submission
        // the example calls file_postupdate_standard_filemanager
        //  to copy the files from the draft file area to the file area
        //  for this submission
        // it then records the number of files in the plugin-specific
        //  "assignsubmission_graph" area

        // EXAMPLE CODE
        /*global $USER, $DB;

        $fileoptions = $this->get_file_options();

        $data = file_postupdate_standard_filemanager($data,
                                                     'files',
                                                     $fileoptions,
                                                     $this->assignment->get_context(),
                                                     'assignsubmission_file',
                                                     ASSIGNSUBMISSION_FILE_FILEAREA,
                                                     $submission->id);

        $filesubmission = $this->get_file_submission($submission->id);

        $count = $this->count_files($submission->id, ASSIGNSUBMISSION_FILE_FILEAREA);

        //send files to event system
        //this lets moodle know that an assessable file was uploaded
        $eventdata = new stdClass();
        $eventdata->modulename = 'assign';
        $eventdata->cmid = $this->assignment->get_course_module()->id;
        $eventdata->itemid = $submission->id;
        $eventdata->courseid = $this->assignment->get_course()->id;
        $eventdata->userid = $USER->id;
        if ($count > 1) {
          $eventdata->files = $files;
        }
        $eventdata->file = $files;
        $eventdata->pathnamehashes = array_keys($files);
        events_trigger('assessable_file_uploaded', $eventdata);

        if($filesubmission) {
          $filesubmission->numfile = $this->count_files($submission->id,
                                                        ASSIGNSUBMISSION_GRAPH_FILEAREA);
          return $DB->update_record('assignsubmission_graph', $filesubmission);
        } else {
          $filesubmission = new stdClass();
          $filesubmission->numFiles = $this->count_files($submission->id,
                                                         ASSIGNSUBMISSION_GRAPH_FILEAREA);
          $filesubmission->submission = $submission->id;
          $filesubmission->assignment = $this->assignment->get_instance()->id;
          return $DB->insert_record('assignsubmission_graph', $filesubmission);
        } */

        global $USER, $DB;

        $editoroptions = $this->get_edit_options();

        $data = file_postupdate_standard_editor($data,
                                                'graph',
                                                $editoroptions,
                                                $this->assignment->get_context(),
                                                'assignsubmission_graph',
                                                ASSIGNSUBMISSION_graph_FILEAREA,
                                                $submission->id);

        $graphsubmission = $this->get_graph_submission($submission->id);

        $fs = get_file_storage();

        $files = $fs->get_area_files($this->assignment->get_context()->id,
                                     'assignsubmission_graph',
                                     ASSIGNSUBMISSION_graph_FILEAREA,
                                     $submission->id,
                                     'id',
                                     false);

        $params = array(
            'context' => context_module::instance($this->assignment->get_course_module()->id),
            'courseid' => $this->assignment->get_course()->id,
            'objectid' => $submission->id,
            'other' => array(
                'pathnamehashes' => array_keys($files),
                'content' => trim($data->graph),
                'format' => $data->graph_editor['format']
            )
        );
        if (!empty($submission->userid) && ($submission->userid != $USER->id)) {
            $params['relateduserid'] = $submission->userid;
        }
        if ($this->assignment->is_blind_marking()) {
            $params['anonymous'] = 1;
        }
        $event = \assignsubmission_graph\event\assessable_uploaded::create($params);
        $event->trigger();

        $groupname = null;
        $groupid = 0;
        // Get the group name as other fields are not transcribed in the logs and this information is important.
        if (empty($submission->userid) && !empty($submission->groupid)) {
            $groupname = $DB->get_field('groups', 'name', array('id' => $submission->groupid), MUST_EXIST);
            $groupid = $submission->groupid;
        } else {
            $params['relateduserid'] = $submission->userid;
        }

        // Unset the objectid and other field from params for use in submission events.
        unset($params['objectid']);
        unset($params['other']);
        $params['other'] = array(
            'submissionid' => $submission->id,
            'submissionattempt' => $submission->attemptnumber,
            'submissionstatus' => $submission->status,
            'groupid' => $groupid,
            'groupname' => $groupname
        );

        if ($graphsubmission) {

            $graphsubmission->graph = $data->graph;
            $graphsubmission->graphformat = $data->graph_editor['format'];
            $params['objectid'] = $graphsubmission->id;
            $updatestatus = $DB->update_record('assignsubmission_graph', $graphsubmission);
            $event = \assignsubmission_graph\event\submission_updated::create($params);
            $event->set_assign($this->assignment);
            $event->trigger();
            return $updatestatus;
        } else {

            $graphsubmission = new stdClass();
            $graphsubmission->graph = $data->graph;
            $graphsubmission->graphformat = $data->graph_editor['format'];

            $graphsubmission->submission = $submission->id;
            $graphsubmission->assignment = $this->assignment->get_instance()->id;
            $graphsubmission->id = $DB->insert_record('assignsubmission_graph', $graphsubmission);
            $params['objectid'] = $graphsubmission->id;
            $event = \assignsubmission_graph\event\submission_created::create($params);
            $event->set_assign($this->assignment);
            $event->trigger();
            return $graphsubmission->id > 0;
        }
    }

    /**
     * Return a list of the text fields that can be imported/exported by this plugin
     *
     * @return array An array of field names and descriptions. (name=>description, ...)
     */
    public function get_editor_fields() {
        return array('graph' => get_string('pluginname', 'assignsubmission_graph'));
    }

    /**
     * Get the content format for the editor
     *
     * @param string $name
     * @param int $submissionid
     * @return int
     */
    public function get_editor_format($name, $submissionid) {
        //TODO
    }


    public function view_summary(stdClass $submission, & $showviewlink) {
        global $CFG;

        $graphsubmission = $this->get_graph_submission($submission->id);
        // Always show the view link.
        $showviewlink = true;

        //TODO
    }

    /**
     * Produce a list of files suitable for export that represent this submission.
     *
     * @param stdClass $submission - For this is the submission data
     * @param stdClass $user - This is the user record for this submission
     * @return array - return an array of files indexed by filename
     */
    public function get_files(stdClass $submission, stdClass $user) {
        //if a plugin produces one or more files, it should implement get_files
        //so that the portfolio API can export a list of all the files from
        //all of the plugins for this assignment submission.
        //this is also used by the offline grading feature in the assignment.

        global $DB;

        $files = array();
        $graphsubmission = $this->get_graph_submission($submission->id);

        // Note that this check is the same logic as the result from the is_empty function but we do
        // not call it directly because we already have the submission record.
        if ($graphsubmission) {
            // Do not pass the text through format_text. The result may not be displayed in Moodle and
            // may be passed to external services such as document conversion or portfolios.
            $formattedtext = $this->assignment->download_rewrite_pluginfile_urls($graphsubmission->graph, $user, $this);
            $head = '<head><meta charset="UTF-8"></head>';

            //TODO

            $filename = get_string('graphfilename', 'assignsubmission_graph');
            $files[$filename] = array($submissioncontent);

            $fs = get_file_storage();

            $fsfiles = $fs->get_area_files($this->assignment->get_context()->id,
                                           'assignsubmission_graph',
                                           ASSIGNSUBMISSION_graph_FILEAREA,
                                           $submission->id,
                                           'timemodified',
                                           false);

            foreach ($fsfiles as $file) {
                $files[$file->get_filename()] = $file;
            }
        }

        return $files;
    }

    /**
     * Display the saved text content from the editor in the view table
     *
     * @param stdClass $submission
     * @return string
     */
    public function view(stdClass $submission) {
        global $CFG;
        $result = '';

        $graphsubmission = $this->get_graph_submission($submission->id);

        if ($graphsubmission) {

            // Render for portfolio API.
            $result .= $this->assignment->render_editor_content(ASSIGNSUBMISSION_graph_FILEAREA,
                                                                $graphsubmission->submission,
                                                                $this->get_type(),
                                                                'graph',
                                                                'assignsubmission_graph');

            //TODO
        }
    }

    /**
     * Return true if this plugin can upgrade an old Moodle 2.2 assignment of this type and version.
     *
     * @param string $type old assignment subtype
     * @param int $version old assignment version
     * @return bool True if upgrade is possible
     */
    public function can_upgrade($type, $version) {
        if ($type == 'online' && $version >= 2011112900) {
            return true;
        }
        return false;
    }


    /**
     * Upgrade the settings from the old assignment to the new plugin based one
     *
     * @param context $oldcontext - the database for the old assignment context
     * @param stdClass $oldassignment - the database for the old assignment instance
     * @param string $log record log events here
     * @return bool Was it a success?
     */
    public function upgrade_settings(context $oldcontext, stdClass $oldassignment, & $log) {
        // No settings to upgrade.
        return true;
    }

    /**
     * Upgrade the submission from the old assignment to the new one
     *
     * @param context $oldcontext - the database for the old assignment context
     * @param stdClass $oldassignment The data record for the old assignment
     * @param stdClass $oldsubmission The data record for the old submission
     * @param stdClass $submission The data record for the new submission
     * @param string $log Record upgrade messages in the log
     * @return bool true or false - false will trigger a rollback
     */
    public function upgrade(context $oldcontext,
                            stdClass $oldassignment,
                            stdClass $oldsubmission,
                            stdClass $submission,
                            & $log) {
        global $DB;

        $graphsubmission = new stdClass();
        $graphsubmission->graph = $oldsubmission->data1;
        $graphsubmission->graphformat = $oldsubmission->data2;

        $graphsubmission->submission = $submission->id;
        $graphsubmission->assignment = $this->assignment->get_instance()->id;

        if ($graphsubmission->graph === null) {
            $graphsubmission->graph = '';
        }

        if ($graphsubmission->graphformat === null) {
            $graphsubmission->graphformat = editors_get_preferred_format();
        }

        if (!$DB->insert_record('assignsubmission_graph', $graphsubmission) > 0) {
            $log .= get_string('couldnotconvertsubmission', 'mod_assign', $submission->userid);
            return false;
        }

        // Now copy the area files.
        $this->assignment->copy_area_files_for_upgrade($oldcontext->id,
                                                        'mod_assignment',
                                                        'submission',
                                                        $oldsubmission->id,
                                                        $this->assignment->get_context()->id,
                                                        'assignsubmission_graph',
                                                        ASSIGNSUBMISSION_graph_FILEAREA,
                                                        $submission->id);
        return true;
    }

    /**
     * Formatting for log info
     *
     * @param stdClass $submission The new submission
     * @return string
     */
    public function format_for_log(stdClass $submission) {
        // Format the info for each submission plugin (will be logged).
        $graphsubmission = $this->get_graph_submission($submission->id);
        $graphloginfo = '';
        $graphloginfo .= get_string('assignsubmission_graph');

        return $graphloginfo;
    }

    /**
     * The assignment has been deleted - cleanup
     *
     * @return bool
     */
    public function delete_instance() {
        global $DB;
        $DB->delete_records('assignsubmission_graph',
                            array('assignment'=>$this->assignment->get_instance()->id));

        return true;
    }

    /**
     * No text is set for this plugin
     *
     * @param stdClass $submission
     * @return bool
     */
    public function is_empty(stdClass $submission) {
        // TODO check if submission is empty
    }

    /**
     * Determine if a submission is empty
     *
     * This is distinct from is_empty in that it is intended to be used to
     * determine if a submission made before saving is empty.
     *
     * @param stdClass $data The submission data
     * @return bool
     */
    public function submission_is_empty(stdClass $data) {
        //TODO
    }

    /**
     * Get file areas returns a list of areas this plugin stores files
     * @return array - An array of fileareas (keys) and descriptions (values)
     */
    public function get_file_areas() {
        return array(ASSIGNSUBMISSION_graph_FILEAREA=>$this->get_name());
    }

    /**
     * Copy the student's submission from a previous submission. Used when a student opts to base their resubmission
     * on the last submission.
     * @param stdClass $sourcesubmission
     * @param stdClass $destsubmission
     */
    public function copy_submission(stdClass $sourcesubmission, stdClass $destsubmission) {
        global $DB;

        // Copy the files across (attached via the text editor).
        $contextid = $this->assignment->get_context()->id;
        $fs = get_file_storage();
        $files = $fs->get_area_files($contextid, 'assignsubmission_graph',
                                     ASSIGNSUBMISSION_graph_FILEAREA, $sourcesubmission->id, 'id', false);
        foreach ($files as $file) {
            $fieldupdates = array('itemid' => $destsubmission->id);
            $fs->create_file_from_storedfile($fieldupdates, $file);
        }

        // Copy the assignsubmission_graph record.
        $graphsubmission = $this->get_graph_submission($sourcesubmission->id);
        if ($graphsubmission) {
            unset($graphsubmission->id);
            $graphsubmission->submission = $destsubmission->id;
            $DB->insert_record('assignsubmission_graph', $graphsubmission);
        }
        return true;
    }

    /**
     * Return a description of external params suitable for uploading an graph submission from a webservice.
     *
     * @return external_description|null
     */
    public function get_external_parameters() {
        $editorparams = array('text' => new external_value(PARAM_RAW, 'The graph for this submission.'),
                              'format' => new external_value(PARAM_INT, 'The format for this submission'),
                              'itemid' => new external_value(PARAM_INT, 'The draft area id for files attached to the submission'));
        $editorstructure = new external_single_structure($editorparams, 'Editor structure', VALUE_OPTIONAL);
        return array('graph_editor' => $editorstructure);
    }


    /**
     * Return the plugin configs for external functions.
     *
     * @return array the list of settings
     * @since Moodle 3.2
     */
    public function get_config_for_external() {
        return (array) $this->get_config();
    }
}
