import type { ChannelsSelect, MultiChannelsSelect } from '@slack/bolt'
import { Builder } from '../builder'
import { actionable, confirmable, focusable, placeholderable } from '../mixins'

export class ChannelsSelectBuilder extends actionable(confirmable(focusable(placeholderable(Builder<ChannelsSelect>)))) {
  private _initialChannel?: string
  private _responseUrlEnabled?: boolean

  initialChannel(initialChannel: string): this {
    this._initialChannel = initialChannel
    return this
  }

  responseUrlEnabled(responseUrlEnabled: boolean): this {
    this._responseUrlEnabled = responseUrlEnabled
    return this
  }

  build(): ChannelsSelect {
    return {
      type: 'channels_select',
      initial_channel: this._initialChannel, // eslint-disable-line camelcase
      response_url_enabled: this._responseUrlEnabled, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}

export class MultiChannelsSelectBuilder extends actionable(confirmable(focusable(placeholderable(Builder<MultiChannelsSelect>)))) {
  private _initialChannels?: string[]
  private _maxSelectedItems?: number

  initialChannels(initialChannels: string[]): this {
    this._initialChannels = [...initialChannels]
    return this
  }

  maxSelectedItems(maxSelectedItems: number): this {
    this._maxSelectedItems = maxSelectedItems
    return this
  }

  build(): MultiChannelsSelect {
    return {
      type: 'multi_channels_select',
      initial_channels: this._initialChannels, // eslint-disable-line camelcase
      max_selected_items: this._maxSelectedItems, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}
