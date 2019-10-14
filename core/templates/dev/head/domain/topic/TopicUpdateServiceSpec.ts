// Copyright 2018 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Tests for Topic update service.
 */

// TODO(#7222): Remove the following block of unnnecessary imports once
// TopicUpdateService.ts is upgraded to Angular 8.
import { AudioLanguageObjectFactory } from
  'domain/utilities/AudioLanguageObjectFactory';
import { AutogeneratedAudioLanguageObjectFactory } from
  'domain/utilities/AutogeneratedAudioLanguageObjectFactory';
import { ChangeObjectFactory } from
  'domain/editor/undo_redo/ChangeObjectFactory';
import { RecordedVoiceoversObjectFactory } from
  'domain/exploration/RecordedVoiceoversObjectFactory';
import { SkillSummaryObjectFactory } from
  'domain/skill/SkillSummaryObjectFactory';
import { StoryReferenceObjectFactory } from
  'domain/topic/StoryReferenceObjectFactory';
import { SubtitledHtmlObjectFactory } from
  'domain/exploration/SubtitledHtmlObjectFactory';
import { SubtopicObjectFactory } from 'domain/topic/SubtopicObjectFactory';
import { SubtopicPageContentsObjectFactory } from
  'domain/topic/SubtopicPageContentsObjectFactory';
import { SubtopicPageObjectFactory } from
  'domain/topic/SubtopicPageObjectFactory';
import { VoiceoverObjectFactory } from
  'domain/exploration/VoiceoverObjectFactory';
import { UpgradedServices } from 'services/UpgradedServices';
// ^^^ This block is to be removed.

require('App.ts');
require('domain/editor/undo_redo/UndoRedoService.ts');
require('domain/topic/TopicObjectFactory.ts');
require('domain/topic/TopicUpdateService.ts');

describe('Topic update service', function() {
  var recordedVoiceoversObjectFactory = null;
  var TopicUpdateService = null;
  var TopicObjectFactory = null;
  var subtopicObjectFactory = null;
  var skillSummaryObjectFactory = null;
  var subtitledHtmlObjectFactory = null;
  var subtopicPageObjectFactory = null;
  var UndoRedoService = null;
  var _sampleTopic = null;
  var _firstSkillSummary = null;
  var _secondSkillSummary = null;
  var _thirdSkillSummary = null;
  var _sampleSubtopicPage = null;

  beforeEach(angular.mock.module('oppia'));
  beforeEach(angular.mock.module('oppia', function($provide) {
    $provide.value(
      'AudioLanguageObjectFactory', new AudioLanguageObjectFactory());
    $provide.value(
      'AutogeneratedAudioLanguageObjectFactory',
      new AutogeneratedAudioLanguageObjectFactory());
    $provide.value('ChangeObjectFactory', new ChangeObjectFactory());
    $provide.value(
      'RecordedVoiceoversObjectFactory',
      new RecordedVoiceoversObjectFactory(new VoiceoverObjectFactory()));
    $provide.value(
      'SkillSummaryObjectFactory', new SkillSummaryObjectFactory());
    $provide.value(
      'StoryReferenceObjectFactory', new StoryReferenceObjectFactory());
    $provide.value(
      'SubtitledHtmlObjectFactory', new SubtitledHtmlObjectFactory());
    $provide.value(
      'SubtopicObjectFactory',
      new SubtopicObjectFactory(new SkillSummaryObjectFactory()));
    $provide.value(
      'SubtopicPageContentsObjectFactory',
      new SubtopicPageContentsObjectFactory(
        new RecordedVoiceoversObjectFactory(new VoiceoverObjectFactory()),
        new SubtitledHtmlObjectFactory()));
    $provide.value(
      'SubtopicPageObjectFactory', new SubtopicPageObjectFactory(
        new SubtopicPageContentsObjectFactory(
          new RecordedVoiceoversObjectFactory(new VoiceoverObjectFactory()),
          new SubtitledHtmlObjectFactory())));
    $provide.value('VoiceoverObjectFactory', new VoiceoverObjectFactory());
  }));
  beforeEach(angular.mock.module('oppia', function($provide) {
    var ugs = new UpgradedServices();
    for (let [key, value] of Object.entries(ugs.upgradedServices)) {
      $provide.value(key, value);
    }
  }));

  beforeEach(angular.mock.inject(function($injector) {
    recordedVoiceoversObjectFactory = $injector.get(
      'RecordedVoiceoversObjectFactory');
    TopicUpdateService = $injector.get('TopicUpdateService');
    TopicObjectFactory = $injector.get('TopicObjectFactory');
    subtitledHtmlObjectFactory = $injector.get('SubtitledHtmlObjectFactory');
    subtopicObjectFactory = $injector.get('SubtopicObjectFactory');
    subtopicPageObjectFactory = $injector.get('SubtopicPageObjectFactory');
    UndoRedoService = $injector.get('UndoRedoService');
    skillSummaryObjectFactory = $injector.get('SkillSummaryObjectFactory');

    var sampleTopicBackendObject = {
      topicDict: {
        id: 'sample_topic_id',
        name: 'Topic name',
        description: 'Topic description',
        version: 1,
        uncategorized_skill_ids: ['skill_1'],
        canonical_story_references: [{
          story_id: 'story_1',
          story_is_published: true
        }],
        additional_story_references: [{
          story_id: 'story_2',
          story_is_published: true
        }],
        subtopics: [{
          id: 1,
          title: 'Title',
          skill_ids: ['skill_2']
        }],
        next_subtopic_id: 2,
        language_code: 'en'
      },
      skillIdToDescriptionDict: {
        skill_1: 'Description 1',
        skill_2: 'Description 2'
      }
    };
    var sampleSubtopicPageObject = {
      id: 'topic_id-1',
      topic_id: 'topic_id',
      page_contents: {
        subtitled_html: {
          html: 'test content',
          content_id: 'content'
        },
        recorded_voiceovers: {
          voiceovers_mapping: {
            content: {
              en: {
                filename: 'test.mp3',
                file_size_bytes: 100,
                needs_update: false
              }
            }
          }
        }
      },
      language_code: 'en'
    };
    _firstSkillSummary = skillSummaryObjectFactory.create(
      'skill_1', 'Description 1');
    _secondSkillSummary = skillSummaryObjectFactory.create(
      'skill_2', 'Description 2');
    _thirdSkillSummary = skillSummaryObjectFactory.create(
      'skill_3', 'Description 3');

    _sampleSubtopicPage = subtopicPageObjectFactory.createFromBackendDict(
      sampleSubtopicPageObject);
    _sampleTopic = TopicObjectFactory.create(
      sampleTopicBackendObject.topicDict,
      sampleTopicBackendObject.skillIdToDescriptionDict);
  }));

  it('should remove/add an additional story id from/to a topic',
    function() {
      expect(_sampleTopic.getAdditionalStoryIds()).toEqual(['story_2']);
      TopicUpdateService.removeAdditionalStory(_sampleTopic, 'story_2');
      expect(_sampleTopic.getAdditionalStoryIds()).toEqual([]);

      UndoRedoService.undoChange(_sampleTopic);
      expect(_sampleTopic.getAdditionalStoryIds()).toEqual(['story_2']);
    }
  );

  it('should create a proper backend change dict for removing an additional ' +
    'story id',
  function() {
    TopicUpdateService.removeAdditionalStory(_sampleTopic, 'story_2');
    expect(UndoRedoService.getCommittableChangeList()).toEqual([{
      cmd: 'delete_additional_story',
      story_id: 'story_2'
    }]);
  });

  it('should not create a backend change dict for removing an additional ' +
    'story id when an error is encountered',
  function() {
    expect(function() {
      TopicUpdateService.removeAdditionalStory(_sampleTopic, 'story_5');
    }).toThrow();
    expect(UndoRedoService.getCommittableChangeList()).toEqual([]);
  });

  it('should remove/add a canonical story id from/to a topic',
    function() {
      expect(_sampleTopic.getCanonicalStoryIds()).toEqual(['story_1']);
      TopicUpdateService.removeCanonicalStory(_sampleTopic, 'story_1');
      expect(_sampleTopic.getCanonicalStoryIds()).toEqual([]);

      UndoRedoService.undoChange(_sampleTopic);
      expect(_sampleTopic.getCanonicalStoryIds()).toEqual(['story_1']);
    }
  );

  it('should create a proper backend change dict for removing a canonical ' +
    'story id',
  function() {
    TopicUpdateService.removeCanonicalStory(_sampleTopic, 'story_1');
    expect(UndoRedoService.getCommittableChangeList()).toEqual([{
      cmd: 'delete_canonical_story',
      story_id: 'story_1'
    }]);
  });

  it('should not create a backend change dict for removing a canonical ' +
    'story id when an error is encountered',
  function() {
    expect(function() {
      TopicUpdateService.removeCanonicalStory(_sampleTopic, 'story_10');
    }).toThrow();
    expect(UndoRedoService.getCommittableChangeList()).toEqual([]);
  });

  it('should add/remove an uncategorized skill id to/from a topic',
    function() {
      expect(_sampleTopic.getUncategorizedSkillSummaries()).toEqual([
        _firstSkillSummary
      ]);
      TopicUpdateService.addUncategorizedSkill(
        _sampleTopic, _thirdSkillSummary);
      expect(_sampleTopic.getUncategorizedSkillSummaries()).toEqual([
        _firstSkillSummary, _thirdSkillSummary
      ]);

      UndoRedoService.undoChange(_sampleTopic);
      expect(_sampleTopic.getUncategorizedSkillSummaries()).toEqual([
        _firstSkillSummary
      ]);
    }
  );

  it('should create a proper backend change dict for adding an uncategorized ' +
    'skill id',
  function() {
    TopicUpdateService.addUncategorizedSkill(
      _sampleTopic, _thirdSkillSummary);
    expect(UndoRedoService.getCommittableChangeList()).toEqual([{
      cmd: 'add_uncategorized_skill_id',
      new_uncategorized_skill_id: 'skill_3'
    }]);
  });

  it('should not create a backend change dict for adding an uncategorized ' +
    'skill id when an error is encountered',
  function() {
    expect(function() {
      TopicUpdateService.addUncategorizedSkill(
        _sampleTopic, _firstSkillSummary);
    }).toThrow();
    expect(UndoRedoService.getCommittableChangeList()).toEqual([]);
  });

  it('should remove/add an uncategorized skill id from/to a topic',
    function() {
      expect(_sampleTopic.getUncategorizedSkillSummaries()).toEqual([
        _firstSkillSummary
      ]);
      TopicUpdateService.removeUncategorizedSkill(
        _sampleTopic, _firstSkillSummary
      );
      expect(_sampleTopic.getUncategorizedSkillSummaries()).toEqual([]);

      UndoRedoService.undoChange(_sampleTopic);
      expect(_sampleTopic.getUncategorizedSkillSummaries()).toEqual([
        _firstSkillSummary
      ]);
    }
  );

  it('should create a proper backend change dict for removing an ' +
    'uncategorized skill id',
  function() {
    TopicUpdateService.removeUncategorizedSkill(
      _sampleTopic, _firstSkillSummary);
    expect(UndoRedoService.getCommittableChangeList()).toEqual([{
      cmd: 'remove_uncategorized_skill_id',
      uncategorized_skill_id: 'skill_1'
    }]);
  });

  it('should not create a backend change dict for removing an uncategorized ' +
    'skill id when an error is encountered',
  function() {
    expect(function() {
      TopicUpdateService.removeUncategorizedSkill(_sampleTopic, 'skill_10');
    }).toThrow();
    expect(UndoRedoService.getCommittableChangeList()).toEqual([]);
  });

  it('should set/unset changes to a topic\'s name', function() {
    expect(_sampleTopic.getName()).toEqual('Topic name');
    TopicUpdateService.setTopicName(_sampleTopic, 'new name');
    expect(_sampleTopic.getName()).toEqual('new name');

    UndoRedoService.undoChange(_sampleTopic);
    expect(_sampleTopic.getName()).toEqual('Topic name');
  });

  it('should create a proper backend change dict for changing names',
    function() {
      TopicUpdateService.setTopicName(_sampleTopic, 'new name');
      expect(UndoRedoService.getCommittableChangeList()).toEqual([{
        cmd: 'update_topic_property',
        property_name: 'name',
        new_value: 'new name',
        old_value: 'Topic name'
      }]);
    }
  );

  it('should set/unset changes to a topic\'s description', function() {
    expect(_sampleTopic.getDescription()).toEqual('Topic description');
    TopicUpdateService.setTopicDescription(_sampleTopic, 'new description');
    expect(_sampleTopic.getDescription()).toEqual('new description');

    UndoRedoService.undoChange(_sampleTopic);
    expect(_sampleTopic.getDescription()).toEqual('Topic description');
  });

  it('should create a proper backend change dict for changing descriptions',
    function() {
      TopicUpdateService.setTopicDescription(_sampleTopic, 'new description');
      expect(UndoRedoService.getCommittableChangeList()).toEqual([{
        cmd: 'update_topic_property',
        property_name: 'description',
        new_value: 'new description',
        old_value: 'Topic description'
      }]);
    }
  );

  it('should set/unset changes to a subtopic\'s title', function() {
    expect(_sampleTopic.getSubtopics()[0].getTitle()).toEqual('Title');
    TopicUpdateService.setSubtopicTitle(_sampleTopic, 1, 'new title');
    expect(_sampleTopic.getSubtopics()[0].getTitle()).toEqual('new title');

    UndoRedoService.undoChange(_sampleTopic);
    expect(_sampleTopic.getSubtopics()[0].getTitle()).toEqual('Title');
  });

  it('should create a proper backend change dict for changing subtopic title',
    function() {
      TopicUpdateService.setSubtopicTitle(_sampleTopic, 1, 'new title');
      expect(UndoRedoService.getCommittableChangeList()).toEqual([{
        cmd: 'update_subtopic_property',
        subtopic_id: 1,
        property_name: 'title',
        new_value: 'new title',
        old_value: 'Title'
      }]);
    }
  );

  it('should not create a backend change dict for changing subtopic title ' +
    'when an error is encountered',
  function() {
    expect(function() {
      TopicUpdateService.setSubtopicTitle(_sampleTopic, 10, 'title2');
    }).toThrow();
    expect(UndoRedoService.getCommittableChangeList()).toEqual([]);
  });

  it('should add/remove a subtopic', function() {
    expect(_sampleTopic.getSubtopics().length).toEqual(1);
    TopicUpdateService.addSubtopic(_sampleTopic, 'Title2');
    expect(_sampleTopic.getSubtopics().length).toEqual(2);
    expect(_sampleTopic.getNextSubtopicId()).toEqual(3);
    expect(_sampleTopic.getSubtopics()[1].getTitle()).toEqual('Title2');
    expect(_sampleTopic.getSubtopics()[1].getId()).toEqual(2);

    UndoRedoService.undoChange(_sampleTopic);
    expect(_sampleTopic.getSubtopics().length).toEqual(1);
  });

  it('should create a proper backend change dict for adding a subtopic',
    function() {
      TopicUpdateService.addSubtopic(_sampleTopic, 'Title2');
      expect(UndoRedoService.getCommittableChangeList()).toEqual([{
        cmd: 'add_subtopic',
        subtopic_id: 2,
        title: 'Title2'
      }]);
    }
  );

  it('should remove/add a subtopic', function() {
    expect(_sampleTopic.getSubtopics().length).toEqual(1);
    TopicUpdateService.deleteSubtopic(_sampleTopic, 1);
    expect(_sampleTopic.getSubtopics()).toEqual([]);
    expect(_sampleTopic.getUncategorizedSkillSummaries()).toEqual([
      _firstSkillSummary, _secondSkillSummary
    ]);

    expect(function() {
      UndoRedoService.undoChange(_sampleTopic);
    }).toThrow();
  });

  it('should properly remove/add a newly created subtopic', function() {
    TopicUpdateService.addSubtopic(_sampleTopic, 'Title2');
    TopicUpdateService.addSubtopic(_sampleTopic, 'Title3');
    expect(_sampleTopic.getSubtopics()[1].getId()).toEqual(2);
    expect(_sampleTopic.getSubtopics()[2].getId()).toEqual(3);
    expect(_sampleTopic.getNextSubtopicId()).toEqual(4);

    TopicUpdateService.deleteSubtopic(_sampleTopic, 2);
    expect(_sampleTopic.getSubtopics().length).toEqual(2);
    expect(_sampleTopic.getSubtopics()[1].getTitle()).toEqual('Title3');
    expect(_sampleTopic.getSubtopics()[1].getId()).toEqual(2);
    expect(_sampleTopic.getNextSubtopicId()).toEqual(3);

    expect(UndoRedoService.getChangeCount()).toEqual(1);
  });

  it('should create a proper backend change dict for deleting a subtopic',
    function() {
      TopicUpdateService.deleteSubtopic(_sampleTopic, 1);
      expect(UndoRedoService.getCommittableChangeList()).toEqual([{
        cmd: 'delete_subtopic',
        subtopic_id: 1
      }]);
    }
  );

  it('should not create a backend change dict for deleting a subtopic ' +
    'when an error is encountered',
  function() {
    expect(function() {
      TopicUpdateService.deleteSubtopic(_sampleTopic, 10);
    }).toThrow();
    expect(UndoRedoService.getCommittableChangeList()).toEqual([]);
  });

  it('should move a skill id to a subtopic', function() {
    expect(_sampleTopic.getUncategorizedSkillSummaries()).toEqual([
      _firstSkillSummary
    ]);
    expect(_sampleTopic.getSubtopics()[0].getSkillSummaries()).toEqual([
      _secondSkillSummary
    ]);
    TopicUpdateService.moveSkillToSubtopic(
      _sampleTopic, null, 1, _firstSkillSummary);
    expect(_sampleTopic.getUncategorizedSkillSummaries()).toEqual([]);
    expect(_sampleTopic.getSubtopics()[0].getSkillSummaries()).toEqual([
      _secondSkillSummary, _firstSkillSummary
    ]);

    UndoRedoService.undoChange(_sampleTopic);
    expect(_sampleTopic.getUncategorizedSkillSummaries()).toEqual([
      _firstSkillSummary
    ]);
    expect(_sampleTopic.getSubtopics()[0].getSkillSummaries()).toEqual([
      _secondSkillSummary
    ]);
  });

  it('should correctly create changelists when moving a skill to a newly ' +
    'created subtopic that has since been deleted', function() {
    TopicUpdateService.addSubtopic(_sampleTopic, 'Title 2');
    TopicUpdateService.moveSkillToSubtopic(
      _sampleTopic, null, 2, _firstSkillSummary
    );
    TopicUpdateService.removeSkillFromSubtopic(
      _sampleTopic, 2, _firstSkillSummary
    );
    TopicUpdateService.deleteSubtopic(_sampleTopic, 2);
    expect(UndoRedoService.getCommittableChangeList()).toEqual([]);

    TopicUpdateService.addSubtopic(_sampleTopic, 'Title 2');
    TopicUpdateService.moveSkillToSubtopic(
      _sampleTopic, 1, 2, _secondSkillSummary
    );
    TopicUpdateService.moveSkillToSubtopic(
      _sampleTopic, 2, 1, _secondSkillSummary
    );
    TopicUpdateService.deleteSubtopic(_sampleTopic, 2);
    expect(UndoRedoService.getCommittableChangeList()).toEqual([{
      cmd: 'remove_skill_id_from_subtopic',
      skill_id: 'skill_2',
      subtopic_id: 1
    }, {
      cmd: 'move_skill_id_to_subtopic',
      skill_id: 'skill_2',
      new_subtopic_id: 1,
      old_subtopic_id: null
    }]);
    UndoRedoService.clearChanges();

    TopicUpdateService.addSubtopic(_sampleTopic, 'Title 2');
    TopicUpdateService.moveSkillToSubtopic(
      _sampleTopic, null, 2, _firstSkillSummary
    );
    TopicUpdateService.moveSkillToSubtopic(
      _sampleTopic, 1, 2, _secondSkillSummary
    );
    TopicUpdateService.deleteSubtopic(_sampleTopic, 2);
    expect(UndoRedoService.getCommittableChangeList()).toEqual([{
      cmd: 'remove_skill_id_from_subtopic',
      skill_id: 'skill_2',
      subtopic_id: 1
    }]);
  });

  it('should create properly decrement subtopic ids of later subtopics when ' +
    'a newly created subtopic is deleted', function() {
    TopicUpdateService.addSubtopic(_sampleTopic, 'Title 2');
    TopicUpdateService.addSubtopic(_sampleTopic, 'Title 3');
    TopicUpdateService.moveSkillToSubtopic(
      _sampleTopic, 1, 3, _secondSkillSummary
    );
    TopicUpdateService.deleteSubtopic(_sampleTopic, 2);
    expect(UndoRedoService.getCommittableChangeList()).toEqual([{
      cmd: 'add_subtopic',
      title: 'Title 3',
      subtopic_id: 2
    }, {
      cmd: 'move_skill_id_to_subtopic',
      old_subtopic_id: 1,
      new_subtopic_id: 2,
      skill_id: 'skill_2'
    }]);
  });

  it('should create a proper backend change dict for moving a skill id to a ' +
    'subtopic',
  function() {
    TopicUpdateService.moveSkillToSubtopic(
      _sampleTopic, null, 1, _firstSkillSummary);
    expect(UndoRedoService.getCommittableChangeList()).toEqual([{
      cmd: 'move_skill_id_to_subtopic',
      old_subtopic_id: null,
      new_subtopic_id: 1,
      skill_id: 'skill_1'
    }]);
  });

  it('should not create a backend change dict for moving a skill id to a' +
    'subtopic when an error is encountered',
  function() {
    expect(function() {
      TopicUpdateService.moveSkillToSubtopic(
        _sampleTopic, null, 1, _secondSkillSummary);
    }).toThrow();
    expect(function() {
      TopicUpdateService.moveSkillToSubtopic(
        _sampleTopic, 1, 2, _secondSkillSummary);
    }).toThrow();
    expect(UndoRedoService.getCommittableChangeList()).toEqual([]);
  });

  it('should remove a skill id from a subtopic', function() {
    expect(_sampleTopic.getUncategorizedSkillSummaries()).toEqual([
      _firstSkillSummary
    ]);
    expect(_sampleTopic.getSubtopics()[0].getSkillSummaries()).toEqual([
      _secondSkillSummary
    ]);
    TopicUpdateService.removeSkillFromSubtopic(
      _sampleTopic, 1, _secondSkillSummary);
    expect(_sampleTopic.getUncategorizedSkillSummaries()).toEqual([
      _firstSkillSummary, _secondSkillSummary
    ]);
    expect(_sampleTopic.getSubtopics()[0].getSkillSummaries()).toEqual([]);

    UndoRedoService.undoChange(_sampleTopic);
    expect(_sampleTopic.getUncategorizedSkillSummaries()).toEqual([
      _firstSkillSummary
    ]);
    expect(_sampleTopic.getSubtopics()[0].getSkillSummaries()).toEqual([
      _secondSkillSummary
    ]);
  });

  it('should create a proper backend change dict for removing a skill id ' +
    'from a subtopic',
  function() {
    TopicUpdateService.removeSkillFromSubtopic(
      _sampleTopic, 1, _secondSkillSummary);
    expect(UndoRedoService.getCommittableChangeList()).toEqual([{
      cmd: 'remove_skill_id_from_subtopic',
      subtopic_id: 1,
      skill_id: 'skill_2'
    }]);
  });

  it('should not create a backend change dict for removing a skill id from a' +
    'subtopic when an error is encountered',
  function() {
    expect(function() {
      TopicUpdateService.removeSkillFromSubtopic(
        _sampleTopic, 1, _firstSkillSummary);
    }).toThrow();
    expect(UndoRedoService.getCommittableChangeList()).toEqual([]);
  });

  it('should set/unset changes to a topic\'s language code', function() {
    expect(_sampleTopic.getLanguageCode()).toEqual('en');
    TopicUpdateService.setTopicLanguageCode(_sampleTopic, 'fi');
    expect(_sampleTopic.getLanguageCode()).toEqual('fi');

    UndoRedoService.undoChange(_sampleTopic);
    expect(_sampleTopic.getLanguageCode()).toEqual('en');
  });

  it('should create a proper backend change dict for changing language codes',
    function() {
      TopicUpdateService.setTopicLanguageCode(_sampleTopic, 'fi');
      expect(UndoRedoService.getCommittableChangeList()).toEqual([{
        cmd: 'update_topic_property',
        property_name: 'language_code',
        new_value: 'fi',
        old_value: 'en'
      }]);
    }
  );

  it('should set/unset changes to a subtopic page\'s page content', function() {
    var newSampleSubtitledHtmlDict = {
      html: 'new content',
      content_id: 'content'
    };
    var newSampleSubtitledHtml =
      subtitledHtmlObjectFactory.createFromBackendDict(
        newSampleSubtitledHtmlDict);
    expect(_sampleSubtopicPage.getPageContents().toBackendDict()).toEqual({
      subtitled_html: {
        html: 'test content',
        content_id: 'content'
      },
      recorded_voiceovers: {
        voiceovers_mapping: {
          content: {
            en: {
              filename: 'test.mp3',
              file_size_bytes: 100,
              needs_update: false
            }
          }
        }
      }
    });
    TopicUpdateService.setSubtopicPageContentsHtml(
      _sampleSubtopicPage, 1, newSampleSubtitledHtml);
    expect(_sampleSubtopicPage.getPageContents().toBackendDict()).toEqual({
      subtitled_html: {
        html: 'new content',
        content_id: 'content'
      },
      recorded_voiceovers: {
        voiceovers_mapping: {
          content: {
            en: {
              filename: 'test.mp3',
              file_size_bytes: 100,
              needs_update: false
            }
          }
        }
      }
    });

    UndoRedoService.undoChange(_sampleSubtopicPage);
    expect(_sampleSubtopicPage.getPageContents().toBackendDict()).toEqual({
      subtitled_html: {
        html: 'test content',
        content_id: 'content'
      },
      recorded_voiceovers: {
        voiceovers_mapping: {
          content: {
            en: {
              filename: 'test.mp3',
              file_size_bytes: 100,
              needs_update: false
            }
          }
        }
      }
    });
  });

  it('should create a proper backend change dict for changing html data',
    function() {
      var newSampleSubtitledHtmlDict = {
        html: 'new content',
        content_id: 'content'
      };
      var newSampleSubtitledHtml =
        subtitledHtmlObjectFactory.createFromBackendDict(
          newSampleSubtitledHtmlDict);
      TopicUpdateService.setSubtopicPageContentsHtml(
        _sampleSubtopicPage, 1, newSampleSubtitledHtml);
      expect(UndoRedoService.getCommittableChangeList()).toEqual([{
        cmd: 'update_subtopic_page_property',
        property_name: 'page_contents_html',
        subtopic_id: 1,
        new_value: newSampleSubtitledHtml.toBackendDict(),
        old_value: {
          html: 'test content',
          content_id: 'content'
        }
      }]);
    }
  );

  it('should create a proper backend change dict for changing subtopic ' +
     'page audio data',
  function() {
    var newRecordedVoiceoversDict = {
      voiceovers_mapping: {
        content: {
          en: {
            filename: 'test_2.mp3',
            file_size_bytes: 1000,
            needs_update: false
          }
        }
      }
    };
    var newVoiceovers = recordedVoiceoversObjectFactory.createFromBackendDict(
      newRecordedVoiceoversDict);
    TopicUpdateService.setSubtopicPageContentsAudio(
      _sampleSubtopicPage, 1, newVoiceovers);
    expect(UndoRedoService.getCommittableChangeList()).toEqual([{
      cmd: 'update_subtopic_page_property',
      property_name: 'page_contents_audio',
      subtopic_id: 1,
      new_value: newVoiceovers.toBackendDict(),
      old_value: {
        voiceovers_mapping: {
          content: {
            en: {
              filename: 'test.mp3',
              file_size_bytes: 100,
              needs_update: false
            }
          }
        }
      }
    }]);
  });
});
