// Copyright 2019 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Service for storing all upgraded services
 */

import { downgradeInjectable } from '@angular/upgrade/static';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { BrowserXhr } from '@angular/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AlertsService } from 'services/alerts.service';
import { AngularNameService } from
  'pages/exploration-editor-page/services/angular-name.service';
import { AnswerClassificationResultObjectFactory } from
  'domain/classifier/AnswerClassificationResultObjectFactory';
import { AnswerGroupsCacheService } from
  // eslint-disable-next-line max-len
  'pages/exploration-editor-page/editor-tab/services/answer-groups-cache.service';
import { AnswerGroupObjectFactory } from
  'domain/exploration/AnswerGroupObjectFactory';
import { AnswerStatsObjectFactory } from
  'domain/exploration/AnswerStatsObjectFactory';
import { AudioLanguageObjectFactory } from
  'domain/utilities/AudioLanguageObjectFactory';
import { AudioTranslationLanguageService } from
  'pages/exploration-player-page/services/audio-translation-language.service';
import { AutogeneratedAudioLanguageObjectFactory } from
  'domain/utilities/AutogeneratedAudioLanguageObjectFactory';
import { BackgroundMaskService } from
  'services/stateful/background-mask.service';
import { baseInteractionValidationService } from
  'interactions/base-interaction-validation.service';
import { BrowserCheckerService } from
  'domain/utilities/browser-checker.service';
import { CamelCaseToHyphensPipe } from
  'filters/string-utility-filters/camel-case-to-hyphens.pipe';
import { ChangeObjectFactory } from
  'domain/editor/undo_redo/ChangeObjectFactory';
import { ClassifierObjectFactory } from
  'domain/classifier/ClassifierObjectFactory';
import { CodeNormalizerService } from 'services/code-normalizer.service';
import { CodeReplPredictionService } from
  'interactions/CodeRepl/code-repl-prediction.service';
import { CodeReplRulesService } from
  'interactions/CodeRepl/directives/code-repl-rules.service';
import { ComputeGraphService } from 'services/compute-graph.service';
import { ConceptCardObjectFactory } from
  'domain/skill/ConceptCardObjectFactory';
import { ContextService } from 'services/context.service';
import { ContinueValidationService } from
  'interactions/Continue/directives/continue-validation.service';
import { CountVectorizerService } from 'classifiers/count-vectorizer.service';
import { CreatorDashboardBackendApiService } from
  'domain/creator_dashboard/creator-dashboard-backend-api.service';
import { CsrfTokenService } from 'services/csrf-token.service';
import { DateTimeFormatService } from 'services/date-time-format.service';
import { DebouncerService } from 'services/debouncer.service';
import { DeviceInfoService } from 'services/contextual/device-info.service';
import { DocumentAttributeCustomizationService } from
  'services/contextual/document-attribute-customization.service';
import { DragAndDropSortInputRulesService } from
  // eslint-disable-next-line max-len
  'interactions/DragAndDropSortInput/directives/drag-and-drop-sort-input-rules.service';
import { EditableExplorationBackendApiService } from
  'domain/exploration/editable-exploration-backend-api.service';
import { EditabilityService } from 'services/editability.service';
import { EditorFirstTimeEventsService } from
  'pages/exploration-editor-page/services/editor-first-time-events.service';
import { EndExplorationValidationService } from
  'interactions/EndExploration/directives/end-exploration-validation.service';
import { EmailDashboardDataService } from
  'pages/email-dashboard-pages/email-dashboard-data.service';
import { EntityContextObjectFactory } from
  'domain/utilities/EntityContextObjectFactory';
import { ExplorationDiffService } from
  'pages/exploration-editor-page/services/exploration-diff.service';
import { ExplorationDraftObjectFactory } from
  'domain/exploration/ExplorationDraftObjectFactory';
import { ExplorationFeaturesService } from
  'services/exploration-features.service';
import { ExplorationHtmlFormatterService } from
  'services/exploration-html-formatter.service';
import { ExplorationObjectFactory } from
  'domain/exploration/ExplorationObjectFactory';
import { ExpressionParserService } from 'expressions/expression-parser.service';
import { ExpressionSyntaxTreeService } from
  'expressions/expression-syntax-tree.service';
import { ExtensionTagAssemblerService } from
  'services/extension-tag-assembler.service';
import { ExtractImageFilenamesFromStateService } from
  // eslint-disable-next-line max-len
  'pages/exploration-player-page/services/extract-image-filenames-from-state.service';
import { FeedbackThreadObjectFactory } from
  'domain/feedback_thread/FeedbackThreadObjectFactory';
import { FormatTimePipe } from 'filters/format-timer.pipe';
import { FractionObjectFactory } from 'domain/objects/FractionObjectFactory';
import { GenerateContentIdService } from 'services/generate-content-id.service';
import { HintObjectFactory } from 'domain/exploration/HintObjectFactory';
import { HtmlEscaperService } from 'services/html-escaper.service';
import { IdGenerationService } from 'services/id-generation.service';
import { ImprovementActionButtonObjectFactory } from
  'domain/statistics/ImprovementActionButtonObjectFactory';
import { ImprovementsDisplayService } from
  // eslint-disable-next-line max-len
  'pages/exploration-editor-page/improvements-tab/services/improvements-display.service';
import { ImprovementsService } from 'services/improvements.service';
import { InteractionObjectFactory } from
  'domain/exploration/InteractionObjectFactory';
import { LanguageUtilService } from 'domain/utilities/language-util.service';
import { LearnerActionObjectFactory } from
  'domain/statistics/LearnerActionObjectFactory';
import { LearnerAnswerDetailsBackendApiService } from
  'domain/statistics/learner-answer-details-backend-api.service';
import { LearnerAnswerDetailsObjectFactory } from
  'domain/statistics/LearnerAnswerDetailsObjectFactory';
import { LearnerAnswerInfoObjectFactory } from
  'domain/statistics/LearnerAnswerInfoObjectFactory';
import { LearnerDashboardActivityIdsObjectFactory } from
  'domain/learner_dashboard/LearnerDashboardActivityIdsObjectFactory';
import { LearnerParamsService } from
  'pages/exploration-player-page/services/learner-params.service';
import { LocalStorageService } from 'services/local-storage.service';
import { LoggerService } from 'services/contextual/logger.service';
import { LostChangeObjectFactory } from
  'domain/exploration/LostChangeObjectFactory';
import { MetaTagCustomizationService } from
  'services/contextual/meta-tag-customization.service';
import { MisconceptionObjectFactory } from
  'domain/skill/MisconceptionObjectFactory';
import { NormalizeWhitespacePipe } from
  'filters/string-utility-filters/normalize-whitespace.pipe';
import { NormalizeWhitespacePunctuationAndCasePipe } from
  // eslint-disable-next-line max-len
  'filters/string-utility-filters/normalize-whitespace-punctuation-and-case.pipe';
import { NumberWithUnitsObjectFactory } from
  'domain/objects/NumberWithUnitsObjectFactory';
import { OutcomeObjectFactory } from 'domain/exploration/OutcomeObjectFactory';
import { PageTitleService } from 'services/page-title.service';
import { ParamChangeObjectFactory } from
  'domain/exploration/ParamChangeObjectFactory';
import { ParamChangesObjectFactory } from
  'domain/exploration/ParamChangesObjectFactory';
import { ParamMetadataObjectFactory } from
  'domain/exploration/ParamMetadataObjectFactory';
import { ParamSpecObjectFactory } from
  'domain/exploration/ParamSpecObjectFactory';
import { ParamSpecsObjectFactory } from
  'domain/exploration/ParamSpecsObjectFactory';
import { ParamTypeObjectFactory } from
  'domain/exploration/ParamTypeObjectFactory';
import { PencilCodeEditorRulesService } from
  'interactions/PencilCodeEditor/directives/pencil-code-editor-rules.service';
import { PlayerPositionService } from
  'pages/exploration-player-page/services/player-position.service';
import { PlayerTranscriptService } from
  'pages/exploration-player-page/services/player-transcript.service';
import { PlaythroughIssueObjectFactory } from
  'domain/statistics/PlaythroughIssueObjectFactory';
import { PlaythroughIssuesBackendApiService } from
  'services/playthrough-issues-backend-api.service';
import { PlaythroughObjectFactory } from
  'domain/statistics/PlaythroughObjectFactory';
import { PredictionResultObjectFactory } from
  'domain/classifier/PredictionResultObjectFactory';
import { PythonProgramTokenizer } from 'classifiers/python-program.tokenizer';
import { QuestionBackendApiService } from
  'domain/question/question-backend-api.service.ts';
import { RatingComputationService } from
  'components/ratings/rating-computation/rating-computation.service';
import { ReadOnlyStoryNodeObjectFactory } from
  'domain/story_viewer/ReadOnlyStoryNodeObjectFactory';
import { ReadOnlyExplorationBackendApiService } from
  'domain/exploration/read-only-exploration-backend-api.service';
import { RecordedVoiceoversObjectFactory } from
  'domain/exploration/RecordedVoiceoversObjectFactory';
import { RubricObjectFactory } from
  'domain/skill/RubricObjectFactory';
import { RuleObjectFactory } from 'domain/exploration/RuleObjectFactory';
import { SVMPredictionService } from 'classifiers/svm-prediction.service';
import { SidebarStatusService } from 'domain/sidebar/sidebar-status.service';
import { SiteAnalyticsService } from 'services/site-analytics.service';
import { SkillObjectFactory } from 'domain/skill/SkillObjectFactory';
import { SkillSummaryObjectFactory } from
  'domain/skill/SkillSummaryObjectFactory';
import { SolutionObjectFactory } from
  'domain/exploration/SolutionObjectFactory';
import { SolutionValidityService } from
  'pages/exploration-editor-page/editor-tab/services/solution-validity.service';
import { StateCardObjectFactory } from
  'domain/state_card/StateCardObjectFactory';
import { StateClassifierMappingService } from
  'pages/exploration-player-page/services/state-classifier-mapping.service';
import { StateContentService } from
  // eslint-disable-next-line max-len
  'components/state-editor/state-editor-properties-services/state-content.service';
import { StateCustomizationArgsService } from
  // eslint-disable-next-line max-len
  'components/state-editor/state-editor-properties-services/state-customization-args.service';
import { StateEditorService } from
  // eslint-disable-next-line max-len
  'components/state-editor/state-editor-properties-services/state-editor.service';
import { StateHintsService } from
  // eslint-disable-next-line max-len
  'components/state-editor/state-editor-properties-services/state-hints.service';
import { StateImprovementSuggestionService } from
  // eslint-disable-next-line max-len
  'pages/exploration-editor-page/statistics-tab/services/state-improvement-suggestion.service';
import { StateInteractionIdService } from
  // eslint-disable-next-line max-len
  'components/state-editor/state-editor-properties-services/state-interaction-id.service';
import { StateObjectFactory } from 'domain/state/StateObjectFactory';
import { StatePropertyService } from
  // eslint-disable-next-line max-len
  'components/state-editor/state-editor-properties-services/state-property.service';
import { StateRecordedVoiceoversService } from
  // eslint-disable-next-line max-len
  'components/state-editor/state-editor-properties-services/state-recorded-voiceovers.service';
import { StateSolicitAnswerDetailsService } from
  // eslint-disable-next-line max-len
  'components/state-editor/state-editor-properties-services/state-solicit-answer-details.service';
import { StateSolutionService } from
  // eslint-disable-next-line max-len
  'components/state-editor/state-editor-properties-services/state-solution.service';
import { StateWrittenTranslationsService } from
  // eslint-disable-next-line max-len
  'components/state-editor/state-editor-properties-services/state-written-translations.service';
import { StatesObjectFactory } from 'domain/exploration/StatesObjectFactory';
import { StopwatchObjectFactory } from
  'domain/utilities/StopwatchObjectFactory';
import { StoryNodeObjectFactory } from
  'domain/story/StoryNodeObjectFactory';
import { StoryPlaythroughObjectFactory } from
  'domain/story_viewer/StoryPlaythroughObjectFactory';
import { StoryReferenceObjectFactory } from
  'domain/topic/StoryReferenceObjectFactory';
import { StorySummaryObjectFactory } from
  'domain/story/StorySummaryObjectFactory';
import { SubtitledHtmlObjectFactory } from
  'domain/exploration/SubtitledHtmlObjectFactory';
import { SubtopicObjectFactory } from 'domain/topic/SubtopicObjectFactory';
import { SuggestionModalService } from 'services/suggestion-modal.service';
import { SuggestionObjectFactory } from
  'domain/suggestion/SuggestionObjectFactory';
import { SuggestionThreadObjectFactory } from
  'domain/suggestion/SuggestionThreadObjectFactory';
import { SuggestionsService } from 'services/suggestions.service';
import { TextInputPredictionService } from
  'interactions/TextInput/text-input-prediction.service';
import { TextInputRulesService } from
  'interactions/TextInput/directives/text-input-rules.service';
import { TextInputValidationService } from
  'interactions/TextInput/directives/text-input-validation.service';
import { ThreadMessageObjectFactory } from
  'domain/feedback_message/ThreadMessageObjectFactory';
import { ThreadMessageSummaryObjectFactory } from
  'domain/feedback_message/ThreadMessageSummaryObjectFactory';
import { ThreadStatusDisplayService } from
  // eslint-disable-next-line max-len
  'pages/exploration-editor-page/feedback-tab/services/thread-status-display.service';
import { TopicObjectFactory } from 'domain/topic/TopicObjectFactory';
import { TopicRightsObjectFactory } from
  'domain/topic/TopicRightsObjectFactory';
import { TopicSummaryObjectFactory } from
  'domain/topic/TopicSummaryObjectFactory';
import { UnitsObjectFactory } from 'domain/objects/UnitsObjectFactory';
import { UrlInterpolationService } from
  'domain/utilities/url-interpolation.service';
import { UrlService } from 'services/contextual/url.service';
import { UserInfoObjectFactory } from 'domain/user/UserInfoObjectFactory';
import { UtilsService } from 'services/utils.service';
import { ValidatorsService } from 'services/validators.service';
import { VersionTreeService } from
  'pages/exploration-editor-page/history-tab/services/version-tree.service';
import { VoiceoverObjectFactory } from
  'domain/exploration/VoiceoverObjectFactory';
import { WindowDimensionsService } from
  'services/contextual/window-dimensions.service';
import { WindowRef } from 'services/contextual/window-ref.service';
import { WinnowingPreprocessingService } from
  'classifiers/winnowing-preprocessing.service';
import { WorkedExampleObjectFactory } from
  'domain/skill/WorkedExampleObjectFactory';
import { WrittenTranslationObjectFactory } from
  'domain/exploration/WrittenTranslationObjectFactory';
import { WrittenTranslationsObjectFactory } from
  'domain/exploration/WrittenTranslationsObjectFactory';

@Injectable({
  providedIn: 'root'
})
export class UpgradedServices {
  getUpgradedServices() {
    var upgradedServices = {};
    /* eslint-disable dot-notation */

    // Topological level: 0.
    upgradedServices['AngularNameService'] = new AngularNameService();
    upgradedServices['AnswerClassificationResultObjectFactory'] =
      new AnswerClassificationResultObjectFactory();
    upgradedServices['AnswerGroupsCacheService'] =
      new AnswerGroupsCacheService();
    upgradedServices['AnswerStatsObjectFactory'] =
      new AnswerStatsObjectFactory();
    upgradedServices['AudioLanguageObjectFactory'] =
      new AudioLanguageObjectFactory();
    upgradedServices['AutogeneratedAudioLanguageObjectFactory'] =
      new AutogeneratedAudioLanguageObjectFactory();
    upgradedServices['BackgroundMaskService'] = new BackgroundMaskService();
    upgradedServices['baseInteractionValidationService'] =
      new baseInteractionValidationService();
    upgradedServices['BrowserCheckerService'] =
      new BrowserCheckerService(new WindowRef());
    upgradedServices['CamelCaseToHyphensPipe'] = new CamelCaseToHyphensPipe();
    upgradedServices['ChangeObjectFactory'] = new ChangeObjectFactory();
    upgradedServices['ClassifierObjectFactory'] = new ClassifierObjectFactory();
    upgradedServices['CodeNormalizerService'] = new CodeNormalizerService();
    upgradedServices['ComputeGraphService'] = new ComputeGraphService();
    upgradedServices['CountVectorizerService'] = new CountVectorizerService();
    upgradedServices['CsrfTokenService'] = new CsrfTokenService();
    upgradedServices['DateTimeFormatService'] = new DateTimeFormatService();
    upgradedServices['DebouncerService'] = new DebouncerService();
    upgradedServices['DragAndDropSortInputRulesService'] =
      new DragAndDropSortInputRulesService();
    upgradedServices['EditabilityService'] = new EditabilityService();
    upgradedServices['EntityContextObjectFactory'] =
      new EntityContextObjectFactory();
    upgradedServices['ExplorationDiffService'] = new ExplorationDiffService();
    upgradedServices['ExplorationDraftObjectFactory'] =
      new ExplorationDraftObjectFactory();
    upgradedServices['ExplorationFeaturesService'] =
      new ExplorationFeaturesService();
    upgradedServices['ExpressionParserService'] = new ExpressionParserService();
    upgradedServices['FractionObjectFactory'] = new FractionObjectFactory();
    upgradedServices['GenerateContentIdService'] =
      new GenerateContentIdService();
    upgradedServices['IdGenerationService'] = new IdGenerationService();
    upgradedServices['ImprovementActionButtonObjectFactory'] =
      new ImprovementActionButtonObjectFactory();
    upgradedServices['HttpClient'] = new HttpClient(
      new HttpXhrBackend(new BrowserXhr));
    upgradedServices['ImprovementsDisplayService'] =
      new ImprovementsDisplayService();
    upgradedServices['ImprovementsService'] = new ImprovementsService();
    upgradedServices['LearnerActionObjectFactory'] =
      new LearnerActionObjectFactory();
    upgradedServices['LearnerAnswerDetailsObjectFactory'] =
      new LearnerAnswerDetailsObjectFactory();
    upgradedServices['LearnerAnswerInfoObjectFactory'] =
      new LearnerAnswerInfoObjectFactory();
    upgradedServices['LearnerDashboardActivityIdsObjectFactory'] =
      new LearnerDashboardActivityIdsObjectFactory();
    upgradedServices['LearnerParamsService'] = new LearnerParamsService();
    upgradedServices['LoggerService'] = new LoggerService();
    upgradedServices['LostChangeObjectFactory'] = new LostChangeObjectFactory(
      new UtilsService);
    upgradedServices['MisconceptionObjectFactory'] =
      new MisconceptionObjectFactory();
    upgradedServices['NormalizeWhitespacePunctuationAndCasePipe'] =
      new NormalizeWhitespacePunctuationAndCasePipe();
    upgradedServices['ParamChangeObjectFactory'] =
      new ParamChangeObjectFactory();
    upgradedServices['ParamMetadataObjectFactory'] =
      new ParamMetadataObjectFactory();
    upgradedServices['ParamTypeObjectFactory'] = new ParamTypeObjectFactory();
    upgradedServices['PlaythroughIssueObjectFactory'] =
      new PlaythroughIssueObjectFactory();
    upgradedServices['PredictionResultObjectFactory'] =
      new PredictionResultObjectFactory();
    upgradedServices['RatingComputationService'] =
      new RatingComputationService();
    upgradedServices['ReadOnlyStoryNodeObjectFactory'] =
      new ReadOnlyStoryNodeObjectFactory();
    upgradedServices['RubricObjectFactory'] =
      new RubricObjectFactory();
    upgradedServices['RuleObjectFactory'] = new RuleObjectFactory();
    upgradedServices['SkillSummaryObjectFactory'] =
      new SkillSummaryObjectFactory();
    upgradedServices['SolutionValidityService'] = new SolutionValidityService();
    upgradedServices['StateImprovementSuggestionService'] =
      new StateImprovementSuggestionService();
    upgradedServices['StopwatchObjectFactory'] = new StopwatchObjectFactory();
    upgradedServices['StoryNodeObjectFactory'] = new StoryNodeObjectFactory();
    upgradedServices['StoryReferenceObjectFactory'] =
      new StoryReferenceObjectFactory();
    upgradedServices['StorySummaryObjectFactory'] =
      new StorySummaryObjectFactory();
    upgradedServices['SubtitledHtmlObjectFactory'] =
      new SubtitledHtmlObjectFactory();
    upgradedServices['SuggestionModalService'] = new SuggestionModalService();
    upgradedServices['SuggestionsService'] = new SuggestionsService();
    upgradedServices['ThreadMessageSummaryObjectFactory'] =
      new ThreadMessageSummaryObjectFactory();
    upgradedServices['ThreadStatusDisplayService'] =
      new ThreadStatusDisplayService();
    upgradedServices['TopicRightsObjectFactory'] =
      new TopicRightsObjectFactory();
    upgradedServices['TopicSummaryObjectFactory'] =
      new TopicSummaryObjectFactory();
    upgradedServices['UnitsObjectFactory'] = new UnitsObjectFactory();
    upgradedServices['UserInfoObjectFactory'] = new UserInfoObjectFactory();
    upgradedServices['UtilsService'] = new UtilsService();
    upgradedServices['VersionTreeService'] = new VersionTreeService();
    upgradedServices['VoiceoverObjectFactory'] = new VoiceoverObjectFactory();
    upgradedServices['WindowRef'] = new WindowRef();
    upgradedServices['WinnowingPreprocessingService'] =
      new WinnowingPreprocessingService();
    upgradedServices['WrittenTranslationObjectFactory'] =
      new WrittenTranslationObjectFactory();
    upgradedServices['baseInteractionValidationService'] =
      new baseInteractionValidationService();
    upgradedServices['Title'] = new Title({});

    // Topological level: 1.
    upgradedServices['AlertsService'] = new AlertsService(
      upgradedServices['LoggerService']);
    upgradedServices['BrowserCheckerService'] = new BrowserCheckerService(
      upgradedServices['WindowRef']);
    // eslint-disable-next-line max-len
    upgradedServices['ContinueValidationService'] = new ContinueValidationService(
      upgradedServices['baseInteractionValidationService']);
    upgradedServices['DeviceInfoService'] = new DeviceInfoService(
      upgradedServices['WindowRef']);
    upgradedServices['DocumentAttributeCustomizationService'] =
      new DocumentAttributeCustomizationService(upgradedServices['WindowRef']);
    upgradedServices['EmailDashboardDataService'] =
      new EmailDashboardDataService(upgradedServices['HttpClient']);
    upgradedServices['EndExplorationValidationService'] =
      new EndExplorationValidationService(
        upgradedServices['baseInteractionValidationService']);
    upgradedServices['ExpressionSyntaxTreeService'] =
      new ExpressionSyntaxTreeService(
        upgradedServices['ExpressionParserService']);
    upgradedServices['FeedbackThreadObjectFactory'] =
      new FeedbackThreadObjectFactory(
        upgradedServices['ThreadMessageSummaryObjectFactory']);
    upgradedServices['HintObjectFactory'] = new HintObjectFactory(
      upgradedServices['SubtitledHtmlObjectFactory']);
    upgradedServices['HtmlEscaperService'] = new HtmlEscaperService(
      upgradedServices['LoggerService']);
    upgradedServices['LocalStorageService'] = new LocalStorageService(
      upgradedServices['ExplorationDraftObjectFactory']);
    upgradedServices['MetaTagCustomizationService'] =
      new MetaTagCustomizationService(upgradedServices['WindowRef']);
    upgradedServices['NormalizeWhitespacePipe'] = new NormalizeWhitespacePipe(
      upgradedServices['UtilsService']);
    upgradedServices['NumberWithUnitsObjectFactory'] =
      new NumberWithUnitsObjectFactory(
        upgradedServices['UnitsObjectFactory'],
        upgradedServices['FractionObjectFactory']);
    upgradedServices['OutcomeObjectFactory'] =
      new OutcomeObjectFactory(upgradedServices['SubtitledHtmlObjectFactory']);
    upgradedServices['PageTitleService'] = new PageTitleService(
      upgradedServices['Title']);
    upgradedServices['ParamChangesObjectFactory'] =
      new ParamChangesObjectFactory(
        upgradedServices['ParamChangeObjectFactory']);
    upgradedServices['ParamMetadataObjectFactory'] =
      new ParamMetadataObjectFactory();
    upgradedServices['ParamSpecObjectFactory'] = new ParamSpecObjectFactory(
      upgradedServices['ParamTypeObjectFactory']);
    upgradedServices['PlayerTranscriptService'] = new PlayerTranscriptService(
      upgradedServices['LoggerService']);
    upgradedServices['PlaythroughObjectFactory'] = new PlaythroughObjectFactory(
      upgradedServices['LearnerActionObjectFactory']);
    upgradedServices['PythonProgramTokenizer'] = new PythonProgramTokenizer(
      upgradedServices['LoggerService']);
    upgradedServices['RecordedVoiceoversObjectFactory'] =
      new RecordedVoiceoversObjectFactory(
        upgradedServices['VoiceoverObjectFactory']);
    upgradedServices['SVMPredictionService'] = new SVMPredictionService(
      upgradedServices['PredictionResultObjectFactory']);
    upgradedServices['SiteAnalyticsService'] = new SiteAnalyticsService(
      upgradedServices['WindowRef']);
    upgradedServices['StateClassifierMappingService'] =
      new StateClassifierMappingService(
        upgradedServices['ClassifierObjectFactory']);
    upgradedServices['StateEditorService'] = new StateEditorService(
      upgradedServices['SolutionValidityService']);
    upgradedServices['StoryPlaythroughObjectFactory'] =
      new StoryPlaythroughObjectFactory(
        upgradedServices['ReadOnlyStoryNodeObjectFactory']);
    upgradedServices['SubtopicObjectFactory'] = new SubtopicObjectFactory(
      upgradedServices['SkillSummaryObjectFactory']);
    upgradedServices['SuggestionObjectFactory'] = new SuggestionObjectFactory(
      upgradedServices['SuggestionsService']);
    upgradedServices['TextInputValidationService'] =
      new TextInputValidationService(
        upgradedServices['baseInteractionValidationService']);
    upgradedServices['ThreadMessageObjectFactory'] =
      new ThreadMessageObjectFactory(
        upgradedServices['ThreadMessageSummaryObjectFactory']);
    upgradedServices['UrlService'] = new UrlService(
      upgradedServices['WindowRef']);
    upgradedServices['WindowDimensionsService'] = new WindowDimensionsService(
      upgradedServices['WindowRef']);
    upgradedServices['WorkedExampleObjectFactory'] =
      new WorkedExampleObjectFactory(
        upgradedServices['SubtitledHtmlObjectFactory']);
    upgradedServices['WrittenTranslationsObjectFactory'] =
      new WrittenTranslationsObjectFactory(
        upgradedServices['WrittenTranslationObjectFactory']);

    // Topological level: 2.
    upgradedServices['AnswerGroupObjectFactory'] = new AnswerGroupObjectFactory(
      upgradedServices['OutcomeObjectFactory'],
      upgradedServices['RuleObjectFactory']);
    upgradedServices['CodeReplPredictionService'] =
      new CodeReplPredictionService(
        upgradedServices['CountVectorizerService'],
        upgradedServices['PythonProgramTokenizer'],
        upgradedServices['SVMPredictionService'],
        upgradedServices['WinnowingPreprocessingService']);
    upgradedServices['CodeReplRulesService'] = new CodeReplRulesService(
      upgradedServices['NormalizeWhitespacePipe'],
      upgradedServices['CodeNormalizerService']);
    upgradedServices['ConceptCardObjectFactory'] = new ConceptCardObjectFactory(
      upgradedServices['SubtitledHtmlObjectFactory'],
      upgradedServices['RecordedVoiceoversObjectFactory'],
      upgradedServices['WorkedExampleObjectFactory']);
    upgradedServices['ContextService'] = new ContextService(
      upgradedServices['UrlService'],
      upgradedServices['EntityContextObjectFactory']);
    upgradedServices['EditorFirstTimeEventsService'] =
      new EditorFirstTimeEventsService(
        upgradedServices['SiteAnalyticsService']);
    upgradedServices['ExtensionTagAssemblerService'] =
      new ExtensionTagAssemblerService(
        upgradedServices['HtmlEscaperService'],
        upgradedServices['CamelCaseToHyphensPipe']);
    upgradedServices['ExtractImageFilenamesFromStateService'] =
      new ExtractImageFilenamesFromStateService(
        upgradedServices['HtmlEscaperService']);
    upgradedServices['LanguageUtilService'] = new LanguageUtilService(
      upgradedServices['AudioLanguageObjectFactory'],
      upgradedServices['AutogeneratedAudioLanguageObjectFactory'],
      upgradedServices['BrowserCheckerService']);
    upgradedServices['ParamSpecsObjectFactory'] = new ParamSpecsObjectFactory(
      upgradedServices['ParamSpecObjectFactory']);
    upgradedServices['PencilCodeEditorRulesService'] =
      new PencilCodeEditorRulesService(
        upgradedServices['NormalizeWhitespacePipe'],
        upgradedServices['NormalizeWhitespacePunctuationAndCasePipe'],
        upgradedServices['CodeNormalizerService']);
    upgradedServices['SidebarStatusService'] = new SidebarStatusService(
      upgradedServices['WindowDimensionsService']);
    upgradedServices['StateContentService'] = new StateContentService(
      upgradedServices['AlertsService'], upgradedServices['UtilsService']);
    upgradedServices['StateCustomizationArgsService'] =
      new StateCustomizationArgsService(
        upgradedServices['AlertsService'], upgradedServices['UtilsService']);
    upgradedServices['StateHintsService'] = new StateHintsService(
      upgradedServices['AlertsService'], upgradedServices['UtilsService']);
    upgradedServices['StateInteractionIdService'] =
      new StateInteractionIdService(
        upgradedServices['AlertsService'], upgradedServices['UtilsService']);
    upgradedServices['StatePropertyService'] = new StatePropertyService(
      upgradedServices['AlertsService'], upgradedServices['UtilsService']);
    upgradedServices['StateRecordedVoiceoversService'] =
      new StateRecordedVoiceoversService(
        upgradedServices['AlertsService'], upgradedServices['UtilsService']);
    upgradedServices['StateSolicitAnswerDetailsService'] =
      new StateSolicitAnswerDetailsService(
        upgradedServices['AlertsService'], upgradedServices['UtilsService']);
    upgradedServices['StateSolutionService'] = new StateSolutionService(
      upgradedServices['AlertsService'], upgradedServices['UtilsService']);
    upgradedServices['StateWrittenTranslationsService'] =
      new StateWrittenTranslationsService(
        upgradedServices['AlertsService'], upgradedServices['UtilsService']);
    upgradedServices['SuggestionThreadObjectFactory'] =
      new SuggestionThreadObjectFactory(
        upgradedServices['SuggestionObjectFactory'],
        upgradedServices['ThreadMessageSummaryObjectFactory']);
    upgradedServices['TextInputRulesService'] = new TextInputRulesService(
      upgradedServices['NormalizeWhitespacePipe']);
    upgradedServices['TopicObjectFactory'] = new TopicObjectFactory(
      upgradedServices['SubtopicObjectFactory'],
      upgradedServices['StoryReferenceObjectFactory'],
      upgradedServices['SkillSummaryObjectFactory']);
    upgradedServices['UrlInterpolationService'] = new UrlInterpolationService(
      upgradedServices['AlertsService'], upgradedServices['UrlService'],
      upgradedServices['UtilsService']);
    upgradedServices['ValidatorsService'] = new ValidatorsService(
      upgradedServices['AlertsService'],
      upgradedServices['NormalizeWhitespacePipe']);

    // Topological level: 3.
    upgradedServices['AudioTranslationLanguageService'] =
      new AudioTranslationLanguageService(
        upgradedServices['BrowserCheckerService'],
        upgradedServices['LanguageUtilService']);
    upgradedServices['CreatorDashboardBackendApiService'] =
      new CreatorDashboardBackendApiService(upgradedServices['HttpClient']);
    upgradedServices['EmailDashboardDataService'] =
      new EmailDashboardDataService(upgradedServices['HttpClient']);
    upgradedServices['ExplorationHtmlFormatterService'] =
      new ExplorationHtmlFormatterService(
        upgradedServices['CamelCaseToHyphensPipe'],
        upgradedServices['ExtensionTagAssemblerService'],
        upgradedServices['HtmlEscaperService']);
    upgradedServices['LearnerAnswerDetailsBackendApiService'] =
        new LearnerAnswerDetailsBackendApiService(
          upgradedServices['HttpClient'],
          upgradedServices['UrlInterpolationService']);
    upgradedServices['PlayerPositionService'] = new PlayerPositionService(
      upgradedServices['ContextService'],
      upgradedServices['PlayerTranscriptService']);
    upgradedServices['PlaythroughIssuesBackendApiService'] =
      new PlaythroughIssuesBackendApiService(
        upgradedServices['HttpClient'],
        upgradedServices['PlaythroughIssuesBackendApiService'],
        upgradedServices['UrlInterpolationService']);
    upgradedServices['QuestionBackendApiService'] =
      new QuestionBackendApiService(
        upgradedServices['HttpClient'],
        upgradedServices['UrlInterpolationService']);
    upgradedServices['ReadOnlyExplorationBackendApiService'] =
      new ReadOnlyExplorationBackendApiService(
        upgradedServices['HttpClient'],
        upgradedServices['UrlInterpolationService']);
    upgradedServices['SkillObjectFactory'] =
      new SkillObjectFactory(
        upgradedServices['ConceptCardObjectFactory'],
        upgradedServices['MisconceptionObjectFactory'],
        upgradedServices['RubricObjectFactory'],
        upgradedServices['ValidatorsService']);
    upgradedServices['StateCardObjectFactory'] =
      new StateCardObjectFactory(
        upgradedServices['AudioTranslationLanguageService']);
    upgradedServices['TopicObjectFactory'] = new TopicObjectFactory(
      upgradedServices['SubtopicObjectFactory'],
      upgradedServices['StoryReferenceObjectFactory'],
      upgradedServices['SkillSummaryObjectFactory']);

    // Topological level: 4.
    upgradedServices['EditableExplorationBackendApiService'] =
      new EditableExplorationBackendApiService(
        upgradedServices['HttpClient'],
        upgradedServices['ReadOnlyExplorationBackendApiService'],
        upgradedServices['UrlInterpolationService']);
    upgradedServices['SolutionObjectFactory'] = new SolutionObjectFactory(
      upgradedServices['SubtitledHtmlObjectFactory'],
      upgradedServices['ExplorationHtmlFormatterService']);
    upgradedServices['StateCardObjectFactory'] = new StateCardObjectFactory(
      upgradedServices['AudioTranslationLanguageService']);

    // Topological level: 5.
    upgradedServices['InteractionObjectFactory'] = new InteractionObjectFactory(
      upgradedServices['AnswerGroupObjectFactory'],
      upgradedServices['HintObjectFactory'],
      upgradedServices['SolutionObjectFactory'],
      upgradedServices['OutcomeObjectFactory']);

    // Topological level: 6.
    upgradedServices['StateObjectFactory'] = new StateObjectFactory(
      upgradedServices['InteractionObjectFactory'],
      upgradedServices['ParamChangesObjectFactory'],
      upgradedServices['RecordedVoiceoversObjectFactory'],
      upgradedServices['SubtitledHtmlObjectFactory'],
      upgradedServices['WrittenTranslationsObjectFactory']);

    // Topological level: 7.
    upgradedServices['StatesObjectFactory'] = new StatesObjectFactory(
      upgradedServices['StateObjectFactory']);

    // Topological level: 8.
    upgradedServices['ExplorationObjectFactory'] = new ExplorationObjectFactory(
      upgradedServices['LoggerService'],
      upgradedServices['ParamChangesObjectFactory'],
      upgradedServices['ParamSpecsObjectFactory'],
      upgradedServices['StatesObjectFactory'],
      upgradedServices['UrlInterpolationService']);

    /* eslint-enable dot-notation */
    return upgradedServices;
  }
}

angular.module('oppia').factory(
  'UpgradedServices',
  downgradeInjectable(UpgradedServices));
