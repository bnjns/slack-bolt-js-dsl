import type { ConversationsSelect, MultiConversationsSelect } from '@slack/bolt'
import { Builder, build } from '../builder'
import type { ConversationFilterInclude, ConversationSelectFilter } from '../types'
import { actionable, confirmable, focusable, placeholderable } from '../mixins'

abstract class SharedConversationsSelectBuilder extends actionable(confirmable(focusable(placeholderable(Builder<ConversationsSelect | MultiConversationsSelect>)))) {
  protected _defaultToCurrentConversation?: boolean
  protected _filter?: ConversationSelectFilter

  defaultToCurrentConversation(defaultToCurrentConversation: boolean): this {
    this._defaultToCurrentConversation = defaultToCurrentConversation
    return this
  }

  filter(filter: ConversationSelectFilter): this
  filter(fn: (builder: FilterBuilder) => void): this
  filter(first: ConversationSelectFilter | ((builder: FilterBuilder) => void)): this {
    if (typeof first === 'function') {
      this._filter = build(FilterBuilder, first)
    } else {
      this._filter = { ...first }
    }
    return this
  }
}

export class ConversationsSelectBuilder extends SharedConversationsSelectBuilder {
  private _initialConversation?: string
  private _responseUrlEnabled?: boolean

  responseUrlEnabled(responseUrlEnabled: boolean): this {
    this._responseUrlEnabled = responseUrlEnabled
    return this
  }

  initialConversation(initialConversation: string): this {
    this._initialConversation = initialConversation
    return this
  }

  build(): ConversationsSelect {
    return {
      type: 'conversations_select',
      initial_conversation: this._initialConversation, // eslint-disable-line camelcase
      response_url_enabled: this._responseUrlEnabled, // eslint-disable-line camelcase
      default_to_current_conversation: this._defaultToCurrentConversation, // eslint-disable-line camelcase
      filter: this._filter,
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}

export class MultiConversationsSelectBuilder extends SharedConversationsSelectBuilder {
  private _initialConversations?: string[]
  private _maxSelectedItems?: number

  maxSelectedItems(maxSelectedItems: number): this {
    this._maxSelectedItems = maxSelectedItems
    return this
  }

  initialConversations(initialConversations: string[]): this {
    this._initialConversations = [...initialConversations]
    return this
  }

  build(): MultiConversationsSelect {
    return {
      type: 'multi_conversations_select',
      max_selected_items: this._maxSelectedItems, // eslint-disable-line camelcase
      initial_conversations: this._initialConversations, // eslint-disable-line camelcase
      default_to_current_conversation: this._defaultToCurrentConversation, // eslint-disable-line camelcase
      filter: this._filter,
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}

class FilterBuilder extends Builder<ConversationSelectFilter> {
  private _include?: ConversationFilterInclude[]
  private _excludeExternalSharedChannels?: boolean
  private _excludeBotUsers?: boolean

  include(include: ConversationFilterInclude[]): this {
    this._include = [...include]
    return this
  }

  excludeExternalSharedChannels(excludeExternalSharedChannels: boolean): this {
    this._excludeExternalSharedChannels = excludeExternalSharedChannels
    return this
  }

  excludeBotUsers(excludeBotUsers: boolean): this {
    this._excludeBotUsers = excludeBotUsers
    return this
  }

  build(): ConversationSelectFilter {
    return {
      include: this._include,
      exclude_external_shared_channels: this._excludeExternalSharedChannels, // eslint-disable-line camelcase
      exclude_bot_users: this._excludeBotUsers, // eslint-disable-line camelcase
    }
  }
}
