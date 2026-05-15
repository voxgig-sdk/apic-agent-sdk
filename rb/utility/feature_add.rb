# ApicAgent SDK utility: feature_add
module ApicAgentUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
