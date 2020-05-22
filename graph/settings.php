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
 * This file defines the admin settings for this plugin
 *
 * @package   assignsubmission_graph
 * @copyright 2020 Chloë Smith <1877342@students.wits.ac.za>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

 // all submission settings should be named assignsubmission_graph/settingname
 // strings are specified in the plugin's language file

$settings->add(new admin_setting_configcheckbox('assignsubmission_graph/default',
                   new lang_string('default', 'assignsubmission_graph'),
                   new lang_string('default_help', 'assignsubmission_graph'), 0));

// check if there is a maxbytes setting for the moodle installation
// if yes, add new admin settings to the settings page

if (isset($CFG->maxbytes)) {
  $name = new lang_string('maximumsubmissionsize', 'assignsubmission_graph');
  $description = new lang_string('configmaxbytes', 'assignsubmission_graph');

  $element = new admin_setting_configselect('assignsubmission_graph/maxbytes',
                                            $name,
                                            $description,
                                            1048576,
                                            get_max_upload_sizes($CFG->maxbytes));

  $settings->add($element);
}
