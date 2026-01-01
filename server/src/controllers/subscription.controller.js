import { Subscription } from '../models/Subscription.js';
import { validateCreateSubscription } from '../validators/subscription.validator.js';

/**
 * POST /api/subscriptions
 * Create a new subscription
 */
export const createSubscription = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Validate request body
    const validationError = validateCreateSubscription(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    // Create subscription
    const subscription = new Subscription({
      ...req.body,
      userId,
    });

    const savedSubscription = await subscription.save();

    return res.status(201).json({
      message: 'Subscription created successfully',
      subscription: savedSubscription,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return res.status(500).json({
      message: 'Failed to create subscription',
      error: error.message,
    });
  }
};

/**
 * GET /api/subscriptions
 * Fetch all subscriptions for the authenticated user
 */
export const getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch subscriptions for this user only
    const subscriptions = await Subscription.find({ userId })
      .sort({ renewalDate: 1 })
      .select('-__v')
      .lean();

    return res.status(200).json({
      subscriptions,
      count: subscriptions.length,
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return res.status(500).json({
      message: 'Failed to fetch subscriptions',
      error: error.message,
    });
  }
};

