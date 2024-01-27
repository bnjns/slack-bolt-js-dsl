import { Builder, missingPropertyError } from '../builder'
import { richTextStyleable } from '../mixins'
import type { BroadcastMentionRange, RichTextMention,  RichTextStyle } from '../types'

export class RichTextMentionBuilder extends richTextStyleable(Builder<RichTextMention>) {
  private _mention?: RichTextMention

  broadcast(range: BroadcastMentionRange): RichTextMentionBuilder {
    this._mention = {
      type: 'broadcast',
      range,
    }
    return this
  }

  channel(channelId: string): RichTextMentionBuilder {
    this._mention = {
      type: 'channel',
      channel_id: channelId, // eslint-disable-line camelcase
    }
    return this
  }

  team(teamId: string): RichTextMentionBuilder {
    this._mention = {
      type: 'team',
      team_id: teamId, // eslint-disable-line camelcase
    }
    return this
  }

  user(userId: string): RichTextMentionBuilder {
    this._mention = {
      type: 'user',
      user_id: userId, // eslint-disable-line camelcase
    }
    return this
  }

  usergroup(usergroupId: string): RichTextMentionBuilder {
    this._mention = {
      type: 'usergroup',
      usergroup_id: usergroupId, // eslint-disable-line camelcase
    }
    return this
  }

  build(): RichTextMention {
    if (this._mention === undefined) {
      throw missingPropertyError('mention')
    }

    return {
      ...this._mention,
      style: this._style,
    }
  }
}

export const richTextBroadcastMention = (range: BroadcastMentionRange, style?: RichTextStyle) => {
  const builder = new RichTextMentionBuilder().broadcast(range)

  if (style !== undefined) {
    builder.style(style)
  }

  return builder.build()
}
export const richTextChannelMention = (channelId: string, style?: RichTextStyle) => {
  const builder = new RichTextMentionBuilder().channel(channelId)

  if (style !== undefined) {
    builder.style(style)
  }

  return builder.build()
}
export const richTextTeamMention = (teamId: string, style?: RichTextStyle) => {
  const builder = new RichTextMentionBuilder().team(teamId)

  if (style !== undefined) {
    builder.style(style)
  }

  return builder.build()
}
export const richTextUserMention = (userId: string, style?: RichTextStyle) => {
  const builder = new RichTextMentionBuilder().user(userId)

  if (style !== undefined) {
    builder.style(style)
  }

  return builder.build()
}
export const richTextUsergroupMention = (usergroupId: string, style?: RichTextStyle) => {
  const builder = new RichTextMentionBuilder().usergroup(usergroupId)

  if (style !== undefined) {
    builder.style(style)
  }

  return builder.build()
}
